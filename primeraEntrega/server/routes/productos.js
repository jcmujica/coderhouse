const express = require('express');
const router = express.Router();
const Producto = require('../producto');
const productos = new Producto('productos');
require('dotenv').config();
const isAdmin = process.env.IS_ADMIN;

router.get('/:id', (req, res, next) => {
    res.send(productos.getById(req.params.id));
});

router.post('/', (req, res, next) => {
    if (isAdmin) {
        const newProductID = productos.save(req.body);
        res.send(productos.getById(newProductID));
    } else {
        res.send({ error: 401, descripcion: `Solo disponible para administradores` });
    };
});

router.put('/:id', (req, res, next) => {
    if (isAdmin) {
        const productId = req.params.id;
        const inputData = req.body;
        productos.updateById(productId, inputData);
        res.send(productos.getAll());
    } else {
        res.send({ error: 401, descripcion: `Solo disponible para administradores` });
    };
});

router.delete('/:id', (req, res, next) => {
    if (isAdmin) {
        const productId = req.params.id;
        productos.deleteById(productId);
        res.send(productos.getAll());
    } else {
        res.send({ error: 401, descripcion: `Solo disponible para administradores` });
    }
});

module.exports = router;