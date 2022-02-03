const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const path = require('path');
const PORT = 8000;
const handlebars = require('express-handlebars');
const Contenedor = require('./contenedor');
const productos = new Contenedor('productos');
const mensajes = new Contenedor('mensajes');
const { restoreProducts } = require('./utils');

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

app.get('/restore', (req, res) => {
    restoreProducts();
    res.redirect('/');
});

io.on('connection', socket => {
    console.log('Cliente conectado');
    socket.emit('listProducts', productos.getAll());
    socket.emit('listMessages', mensajes.getAll());
    socket.on('submitProduct', (prod) => {
        productos.save(prod);
        io.sockets.emit('listProducts', productos.getAll());
    });
    socket.on('submitMessage', (msg) => {
        mensajes.save(msg);
        io.sockets.emit('listMessages', mensajes.getAll());
    });
});

const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

connectedServer.on('error', (err) => { console.error(err) });