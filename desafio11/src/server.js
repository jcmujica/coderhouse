const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { config: dotEnvConfig } = require('dotenv');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const path = require('path');
const PORT = 8000;
const Productos = require('./productos');
const Mensajes = require('./mensajes');
const Usuarios = require('./usuarios');
const { options: mariaDBOptions } = require('./db/mariaDB/config');
const { options: mongoOptions } = require('./db/mongo/config');
const config = require('./db/firebase/config');
const generateProductsData = require('./utils/generateProductsData');

const productos = new Productos({
    name: 'productos',
    options: mariaDBOptions
});

const mensajes = new Mensajes({
    name: 'mensajes',
    options: config
})

const usuarios = new Usuarios({
    name: 'usuarios',
    cnxStr: mongoOptions.url,
    params: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
}, mongoose.model('usuario', mongoose.Schema({
    username: String,
    password: String
})));

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const publicPath = path.join(__dirname, './public')

dotEnvConfig();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicPath));
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: mongoOptions.url,
        autoReconnect: true,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    })
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(publicPath, 'register.html'));
});

app.get('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const result = await usuarios.register({ username, password });

    if (result.success) {
        req.session.user = result.user;
    }
});

app.get('/login', async (req, res) => {
    const { username, password } = req.query;
    const result = await usuarios.login({ username, password });
    if (result) {
        req.session.user = result;
        res.send('ok');
    } else {
        res.send('error');
    }
});

app.get('/logout', (req, res) => {

});

app.get('/api/productos-test', (req, res) => {
    const products = generateProductsData(6)
    res.send(products);
});

io.on('connection', async (socket) => {
    console.log('Cliente conectado');
    try {
        socket.emit('listProducts', await productos.getAll());
        socket.emit('listMessages', await mensajes.getAll());
        socket.on('submitProduct', async (prod) => {
            await productos.save(prod);
            io.sockets.emit('listProducts', await productos.getAll());
        });
        socket.on('submitMessage', async (msg) => {
            await mensajes.create(msg);
            io.sockets.emit('listMessages', await mensajes.getAll());
        });
    } catch (e) {
        console.log(e)
    }

});

const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

connectedServer.on('error', (err) => { console.error(err) });