import { Router } from 'express';
import UsuariosController from '../controllers/UsuariosController.js';
import { passport, isLoggedIn, isAdmin, isSelf } from '../middlewares/auth.js';

const router = new Router();

class UsuariosRouter {
    constructor() {
        this.controller = new UsuariosController();
    }

    start() {
        router.get('/', isAdmin , async (req, res, next) => {
            const data = await this.controller.getAllUsers()
            res.json({ data })
        });

        router.get('/:id', async (req, res, next) => {
            const data = await this.controller.getUser(req.params.id)
            res.json({ data })
        });

        router.post('/login', passport.authenticate('login'), async (req, res, next) => {
            const data = await this.controller.loginUser(req.user)
            res.json({ data })
        });

        router.post('/register', passport.authenticate('register'), async (req, res, next) => {
            const data = await this.controller.registerUser(req.user)
            res.json({ data })
        });

        router.put('/:id', isLoggedIn, isSelf, async (req, res, next) => {
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