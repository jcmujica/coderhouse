import { Router } from 'express';
import CarritosController from '../controllers/CarritosController.js';

const router = new Router();

class CarritosRouter {
    constructor() {
        this.controller = new CarritosController();
    }

    start() {
        router.get('/', async (req, res, next) => {
            const data = await this.controller.getAllCarts()
            res.json({ data })
        });

        router.get('/:id', async (req, res, next) => {
            const data = await this.controller.getCart(req.params.id)
            res.json({ data })
        });

        router.post('/', async (req, res, next) => {
            const data = await this.controller.createCart(req.body)
            res.json({ data })
        });

        router.put('/:id', async (req, res, next) => {
            const data = await this.controller.updateCart(req.params.id, req.body)
            res.json({ data })
        });

        router.delete('/:id', async (req, res, next) => {
            const data = await this.controller.deleteCart(req.params.id)
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