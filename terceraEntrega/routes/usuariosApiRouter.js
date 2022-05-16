import { Router } from 'express';
import { config } from 'dotenv';
import { UsuariosDao } from '../daos/UsuariosDao.js';
config();
const usuarios = UsuariosDao;

const usuariosApiRouter = new Router();

usuariosApiRouter.get('/', (req, res) => {
    if (req.session.user) {
        const { _doc } = req.session.user;
        res.send({
            username: _doc.username,
            _id: _doc._id
        });
    } else {
        res.send({ error: 'No user logged in' });
    };
});

usuariosApiRouter.post('/register', async (req, res) => {
    const result = await usuarios.register(req.body);

    if (result._id) {
        req.session.user = result;
    };
    res.send(result);
});

usuariosApiRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const result = await usuarios.login({ username, password });

    if (result._id) {
        req.session.user = result
    };
    res.send(result);
});

usuariosApiRouter.get('/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.send(true);
});

export default usuariosApiRouter;