const express = require('express');
const router = express.Router();
const Carritos = require('../carritos');
const carritos = new Carritos('carritos');
require('dotenv').config();

router.get('/:id/productos', (req, res, next) => {
    res.send(carritos.getById(req.params.id).productos);
});

router.post('/', (req, res, next) => {
    const timestamp = new Date().getTime();
    const newCarritoID = carritos.save({ productos: req.body.productos, timestamp });
    res.send(carritos.getById(newCarritoID));
});

router.post('/:id/productos', (req, res, next) => {
    carritos.updateCartProductsById(req.params.id, req.body);
    res.send(carritos.getById(req.params.id));
});

router.delete('/:id', (req, res, next) => {
    const carritoId = req.params.id;
    carritos.deleteById(carritoId);
    res.send(carritos.getAll());
});

router.delete('/:id/productos/:id_prod', (req, res, next) => {
    const carritoId = req.params.id;
    const productoId = req.params.id_prod;
    carritos.deleteCartProductById(carritoId, productoId);
    res.send(carritos.getAll());
});

module.exports = router;