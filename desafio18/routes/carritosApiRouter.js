import { Router } from 'express';
import { CarritosDaoMongoDb } from '../daos/CarritosDao.js';
const carritos = CarritosDaoMongoDb;

const carritosApiRouter = new Router();

carritosApiRouter.get('/:id/productos', (req, res, next) => {
    carritos.getById(req.params.id).then(carrito => {
        res.send(carrito.products);
    })
});

carritosApiRouter.post('/', (req, res, next) => {
    const carrito = {
        timestamp: new Date().getTime(),
        products: []
    };
    carritos.create(carrito).then(result => {
        res.send(result);
    });
});

carritosApiRouter.post('/:id/productos', (req, res, next) => {
    carritos.cartUpdateProductById(req.params.id, req.body).then(result => {
        res.send(result);
    });
});

carritosApiRouter.delete('/:id', (req, res, next) => {
    carritos.deleteById(req.params.id).then(result => {
        res.send(result);
    });
});

carritosApiRouter.delete('/:id/productos/:id_prod', (req, res, next) => {
    carritos.cartDeleteProductById(req.params.id, req.params.id_prod).then(result => {
        res.send(result);
    });
});

export default carritosApiRouter;