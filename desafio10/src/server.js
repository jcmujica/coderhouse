const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const path = require('path');
const PORT = 8000;
const Productos = require('./productos');
const Mensajes = require('./mensajes');
const { options: mariaDBOptions } = require('./db/mariaDB/config');
const config = require('./db/firebase/config');
const generateProductsData = require('./utils/generateProductsData');
const normalizeMessages = require('./utils/normalizeMessages');

const productos = new Productos({
    name: 'productos',
    options: mariaDBOptions
});

const mensajes = new Mensajes({
    name: 'mensajes',
    options: config
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

app.get('/api/productos-test', (req, res) => {
    const products = generateProductsData(6)
    res.send(products);
});

io.on('connection', async (socket) => {
    console.log('Cliente conectado');
    try {
        socket.emit('listProducts', await productos.getAll());

        const chat = await mensajes.getAll();
        const normalizedChat = normalizeMessages(chat);
        socket.emit('listMessages', await mensajes.getAll());
        socket.on('submitProduct', async (prod) => {
            await productos.save(prod);
            io.sockets.emit('listProducts', await productos.getAll());
        });
        socket.on('submitMessage', async (msg) => {
            await mensajes.create(msg);
            io.sockets.emit('listMessages', normalizedChat);
        });
    } catch (e) {
        console.log(e)
    }

});

const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

connectedServer.on('error', (err) => { console.error(err) });