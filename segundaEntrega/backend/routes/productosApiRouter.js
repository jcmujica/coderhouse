import { Router } from 'express';
import { config } from 'dotenv';
import { ProductosDaoFirebase } from '../daos/productos/ProductosDaoFirebase.js';
import { ProductosDaoMongoDb } from '../daos/productos/ProductosDaoMongoDb.js';
import { ProductosDaoArchivo } from '../daos/productos/ProductosDaoArchivo.js';
config();
const productos = process.env.DB === 'firebase' ? ProductosDaoFirebase : process.env.DB === 'fs' ? ProductosDaoArchivo : ProductosDaoMongoDb;

const productosApiRouter = new Router();

productosApiRouter.get('/:id', (req, res, next) => {
    productos.getById(req.params.id).then(producto => {
        res.send(producto);
    })
});

productosApiRouter.get('/', (req, res, next) => {
    productos.getAll().then(productos => {
        res.send(productos);
    });
});

productosApiRouter.post('/', (req, res, next) => {
    productos.create(req.body).then(result => {
        res.send(result);
    });
});

productosApiRouter.put('/:id', (req, res, next) => {
    productos.updateById(req.params.id, req.body).then(result => {
        res.send(result);
    });
});

productosApiRouter.delete('/:id', (req, res, next) => {
    productos.deleteById(req.params.id).then(result => {
        res.send(result);
    });
});

export default productosApiRouter;