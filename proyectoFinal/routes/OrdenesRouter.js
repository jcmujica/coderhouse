import { Router } from 'express';
import OrdenesController from '../controllers/OrdenesController.js';
import { isAdmin, isAuth } from '../middlewares/auth.js';

const router = new Router();

class OrdenesRouter {
    constructor() {
        this.controller = new OrdenesController();
    }

    start() {
        router.get('/:id', isAuth, async (req, res, next) => {
            const data = await this.controller.getOrder(req.params.id)
            res.json({ data })
        });

        router.get('/user/:id', isAuth, async (req, res, next) => {
            const data = await this.controller.getUserOrders(req.params.id)
            res.json({ data })
        });

        router.post('/', isAuth, async (req, res, next) => {
            const data = await this.controller.createOrder(req.body)
            res.json({ data })
        });

        router.put('/:id', isAuth, async (req, res, next) => {
            const data = await this.controller.updateOrder(req.params.id, req.body)
            res.json({ data })
        });

        router.delete('/:id', isAuth, async (req, res, next) => {
            const data = await this.controller.deleteOrder(req.params.id)
            res.json({ data })
        });

        return router;
    };
};

export default OrdenesRouter;