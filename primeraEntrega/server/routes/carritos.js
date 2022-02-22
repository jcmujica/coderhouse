const express = require('express');
const router = express.Router();
const Carrito = require('../carrito');
const carrito = new Carrito('carrito');
require('dotenv').config();

router.get('/:id/productos', (req, res, next) => {
    res.send(carrito.getById(req.params.id).productos);
});

router.post('/', (req, res, next) => {
    const timestamp = new Date().getTime();
    const newCarritoID = carrito.save({ productos: req.body.productos, timestamp });
    res.send(carrito.getById(newCarritoID));
});

router.post('/:id/productos', (req, res, next) => {
    carrito.updateCartProductsById(req.params.id, req.body);
    res.send(carrito.getById(req.params.id));
});

router.delete('/:id', (req, res, next) => {
    const carritoId = req.params.id;
    carrito.deleteById(carritoId);
    res.send(carrito.getAll());
});

router.delete('/:id/productos/:id_prod', (req, res, next) => {
    const carritoId = req.params.id;
    const productoId = req.params.id_prod;
    carrito.deleteCartProductById(carritoId, productoId);
    res.send(carrito.getAll());
});

module.exports = router;