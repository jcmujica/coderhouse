const Contenedor = require('./contenedor');
const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const productos = new Contenedor('productos');
const carrito = new Contenedor('carrito');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/auth/role', (req, res) => {
    res.send({
        isAdmin: true
    });
});

app.get('/api/productos', (req, res, next) => {
    const products = productos.getAll();
    res.send(products);
});

app.get('/api/productos/:id', (req, res, next) => {
    res.send(req.params.id ? productos.getById(req.params.id) : productos.getAll());
});

app.post('/api/productos', (req, res, next) => {
    const newProductID = productos.save(req.body);
    res.send(productos.getById(newProductID));
});

app.put('/api/productos/:id', (req, res, next) => {
    const productId = req.params.id;
    const inputData = req.body;
    productos.updateById(productId, inputData);
    res.send(productos.getAll());
});

app.delete('/api/productos/:id', (req, res, next) => {
    const productId = req.params.id;
    productos.deleteById(productId);
    res.send(productos.getAll());
});

app.get('/api/carrito/:id/productos', (req, res, next) => {
    let response = null;
    if (req.params.id) {
        response = carrito.getById(req.params.id).productos;
    } else {
        res.send("No se ha especificado el id del carrito");
    };
    res.send(response);
});

app.post('/api/carrito/:id/productos', (req, res, next) => {
    carrito.updateById(req.params.id, req.body);
    res.send(carrito.getById(req.params.id));
});

app.post('/api/carrito/', (req, res, next) => {
    const timestamp = new Date().getTime();
    const newCarritoID = carrito.save({ productos: req.body.productos, timestamp });
    res.send(carrito.getById(newCarritoID));
});

app.delete('/api/carrito/:id', (req, res, next) => {
    const carritoId = req.params.id;
    carrito.deleteById(carritoId);
    res.send(carrito.getAll());
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})