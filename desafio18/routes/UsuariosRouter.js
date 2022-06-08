import { Router } from 'express';
import { transporter } from '../utils/index.js';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import config from '../config.js';
import { UsuariosDao } from '../daos/UsuariosDao.js';
import { logger } from '../utils/logger.js';

const usuariosApiRouter = new Router();

const generateToken = (user) => {
    const token = jwt.sign({ data: user }, config.JWT_SECRET, { expiresIn: '24h' });
    return token;
};

const userToHtmlBody = (user) => {
    return `
        <h1>Nuevo registro de: ${user.username}</h1>
        <img src="${user.avatar}" />
        <ul>
            <li>Nombre: ${user.name}</li>
            <li>Direccion: ${user.address}</li>
            <li>Edad: ${user.age}</li>
            <li>Telefono: ${user.phone}</li>
        </ul>
    `;
};

/* PASSPORT */

passport.use('login', new LocalStrategy({ passReqToCallback: true },
    async (req, username, password, done) => {
        const user = await UsuariosDao.findByUsername(username);

        if (user) {
            const token = await generateToken(user);
            user.token = token;
            return done(null, user);
        }

        if (user.password !== password) {
            return done(null, false);
        }

        return done(null, false);
    }));

passport.use('register', new LocalStrategy({ passReqToCallback: true },
    async (req, username, password, done) => {
        const data = req.body;
        const user = await UsuariosDao.findOrCreate(data);

        if (!user.error) {
            return done(null, user);
        }

        return done(null, false);
    }));

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
    const user = await UsuariosDao.findByUsername(username);
    done(null, user);
});

/* LOGIN */

usuariosApiRouter.post('/login', passport.authenticate('login', {
    successRedirect: '/api/user/login-success',
    failureRedirect: '/api/user/login-failure'
}));

usuariosApiRouter.get('/login-success', (req, res) => {
    const { user } = req;
    res.send({ message: 'Login success', token: user.token });
});

usuariosApiRouter.get('/login-failure', (req, res) => {
    res.send({ message: 'Login failure' });
});

/* REGISTER */

usuariosApiRouter.post('/register', passport.authenticate('register', {
    successRedirect: '/api/user/register-success',
    failureRedirect: '/api/user/register-failure'
}));

usuariosApiRouter.get('/register-success', async (req, res) => {
    const { user } = req;
    try {
        await transporter.sendMail({
            ...config.emailer.options,
            html: userToHtmlBody(user),
        });
    } catch (e) {
        logger.error(e);
    }
    res.send('Register success');
});

usuariosApiRouter.get('/register-failure', (req, res) => {
    res.send('Register failure');
});

/* LOGOUT */

usuariosApiRouter.get('/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.send(true);
});

export default usuariosApiRouter;