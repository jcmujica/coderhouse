import { Router } from 'express';
import ProductosController from '../controllers/ProductosController.js';

const router = new Router();

class ProductosRouter {
    constructor() {
        this.controller = new ProductosController();
    }

    start() {
        router.get('/', this.controller.getAllProducts);

        return router;
    }
}

export default ProductosRouter;