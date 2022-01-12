const Contenedor = require('./contenedor');
const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();


const productos = new Contenedor('productos');

app.get('/', (req, res, next) => {
    res.send('<h1>Bienvenido a la app de express</h1>');
});

app.get('/productos', (req, res, next) => {
    const prods = productos.getAll()
    res.send(prods);
});

app.get('/productosRandom', (req, res, next) => {
    const prods = productos.getAll()
    const random = Math.floor(Math.random() * prods.length);
    res.send(prods[random]);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})