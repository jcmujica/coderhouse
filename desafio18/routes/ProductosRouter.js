import { Router } from 'express';
import ProductosController from '../controllers/ProductosController.js';
import { isAdmin } from '../middlewares/auth.js';

const router = new Router();

class ProductosRouter {
    constructor() {
        this.controller = new ProductosController();
    }

    start() {
        router.get('/', async (req, res, next) => {
            const data = await this.controller.getAllProducts()
            res.json({ data })
        });

        router.get('/:id', async (req, res, next) => {
            const data = await this.controller.getProduct(req.params.id)
            res.json({ data })
        });

        router.post('/', isAdmin, async (req, res, next) => {
            const data = await this.controller.createProduct(req.body)
            res.json({ data })
        });

        router.put('/:id', async (req, res, next) => {
            const data = await this.controller.updateProduct(req.params.id, req.body)
            res.json({ data })
        });

        router.delete('/:id', async (req, res, next) => {
            const data = await this.controller.deleteProduct(req.params.id)
            res.json({ data })
        });

        return router;
    };
};

export default ProductosRouter;