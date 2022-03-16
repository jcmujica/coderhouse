const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const path = require('path');
const PORT = 8000;
const Productos = require('./productos');
const Mensajes = require('./mensajes');
const { options: mariaDBOptions } = require('./db/mariaDB/config');
const { options: sqLiteOptions } = require('./db/sqLite/config');
const productos = new Productos({
    name: 'productos',
    options: mariaDBOptions
});
const mensajes = new Mensajes({
    name: 'mensajes',
    options: sqLiteOptions
});

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const publicPath = path.join(__dirname, './public')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

io.on('connection', async (socket) => {
    console.log('Cliente conectado');
    socket.emit('listProducts', await productos.getAll());

    socket.emit('listMessages', await mensajes.getAll());
    socket.on('submitProduct', async (prod) => {
        await productos.save(prod);
        io.sockets.emit('listProducts', await productos.getAll());
    });
    socket.on('submitMessage', async (msg) => {
        await mensajes.save(msg);
        io.sockets.emit('listMessages', await mensajes.getAll());
    });
});

const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

connectedServer.on('error', (err) => { console.error(err) });