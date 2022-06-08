import { Router } from 'express';
import CarritosController from '../controllers/CarritosController.js';

const router = new Router();

class CarritosRouter {
    constructor() {
        this.controller = new CarritosController();
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

        router.post('/', async (req, res, next) => {
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

        router.post('/purchase', async (req, res, next) => {
            const data = await this.controller.purchaseCart(req.body)
            res.json({ data })
        });

        return router;
    };
};

export default CarritosRouter;