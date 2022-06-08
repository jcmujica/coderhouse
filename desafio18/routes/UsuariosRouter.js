import { Router } from 'express';
import UsuariosController from '../controllers/UsuariosController.js';

const router = new Router();

class UsuariosRouter {
    constructor() {
        this.controller = new UsuariosController();
    }

    start() {
        router.get('/', async (req, res, next) => {
            const data = await this.controller.getAllUsers()
            res.json({ data })
        });

        router.get('/:id', async (req, res, next) => {
            const data = await this.controller.getUser(req.params.id)
            res.json({ data })
        });

        router.post('/', async (req, res, next) => {
            const data = await this.controller.createUser(req.body)
            res.json({ data })
        });

        router.put('/:id', async (req, res, next) => {
            const data = await this.controller.updateUser(req.params.id, req.body)
            res.json({ data })
        });

        router.delete('/:id', async (req, res, next) => {
            const data = await this.controller.deleteUser(req.params.id)
            res.json({ data })
        });

        router.post('/purchase', async (req, res, next) => {
            const data = await this.controller.purchaseUser(req.body)
            res.json({ data })
        });

        return router;
    };
};

export default UsuariosRouter;