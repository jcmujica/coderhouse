import { Router } from 'express';
import UsuariosController from '../controllers/UsuariosController.js';
import {
    isAuth,
    isAdmin,
    isSelf,
    login,
    register
} from '../middlewares/auth.js';

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

        router.get('/:id', isAuth, async (req, res, next) => {
            const data = await this.controller.getUser(req.params.id)
            res.json({ data })
        });

        router.post('/login', login, async (req, res, next) => {
            res.json({ data: req.user });
        });

        router.post('/register', register, async (req, res, next) => {
            console.log('first', req.user)
            const data = await this.controller.registerUser(req.user)
            res.json({ data })
        });

        router.post('/logout', (req, res, next) => {
            req.logout()
            res.json({ data: true })
        });

        router.put('/:id', isAuth, isSelf, async (req, res, next) => {
            const data = await this.controller.updateUser(req.params.id, req.body)
            res.json({ data })
        });

        router.delete('/:id', isAdmin, async (req, res, next) => {
            const data = await this.controller.deleteUser(req.params.id)
            res.json({ data })
        });

        router.post('/createAdmin', isAdmin, async (req, res, next) => {
            const data = await this.controller.createAdmin(req.body)
            res.json({ data })
        });

        return router;
    };
};

export default UsuariosRouter;