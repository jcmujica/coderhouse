import { Router } from 'express';
import { config as dotEnvConfig } from 'dotenv';
import { transporter } from '../utils/index.js';
import { twilio } from '../utils/index.js';
import config from '../config.js';
import { UsuariosDao } from '../daos/UsuariosDao.js';
dotEnvConfig();
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
        try {
            await transporter.sendMail({
                ...config.emailer.options,
                subject: 'Nuevo Registro',
                html: `<h1>Nuevo usuario: ${result.username}</h1>`
            });
        } catch (error) {
            console.log(err)
        }
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


usuariosApiRouter.post('/message/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req.body;
    if (!id || !body) return null;
    try {
        const user = await usuarios.getById(id);
        const userPhone = "whatsapp:" + user.phone;
        await twilio.sendMessage({ to: userPhone, body });
        await transporter.sendMail({
            ...config.emailer.options,
            html: `<p>${body}</p>`
        });
        res.send(true);
    } catch (e) {
        console.log(e);
        res.send({ error: 'error in message', message: e.message });
    }
});

export default usuariosApiRouter;