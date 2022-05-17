import { Router } from 'express';
import { config as dotEnvConfig } from 'dotenv';
import { transporter } from '../utils/index.js';
import { twilio } from '../utils/index.js';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import config from '../config.js';
import { UsuariosDao } from '../daos/UsuariosDao.js';
dotEnvConfig();

const usuariosApiRouter = new Router();

const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).send('No autorizado');
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

passport.use('login', new LocalStrategy(
    async (username, password, done) => {
        const user = await UsuariosDao.findByUsername(username);

        if (user) {
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

        console.log('USER', user);

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
    res.send('Login success');
});

usuariosApiRouter.get('/login-failure', (req, res) => {
    res.send('Login failure');
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
        console.log(e);
    }
    res.send('Register success');
});

usuariosApiRouter.get('/register-failure', (req, res) => {
    console.log('first', res);
    res.send('Register failure');
});

/* LOGOUT */

usuariosApiRouter.get('/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.send(true);
});

// usuariosApiRouter.get('/', (req, res) => {
//     if (req.session.user) {
//         const { _doc } = req.session.user;
//         res.send({
//             username: _doc.username,
//             _id: _doc._id
//         });
//     } else {
//         res.send({ error: 'No user logged in' });
//     };
// });


// usuariosApiRouter.post('/message/:id', async (req, res) => {
//     const { id } = req.params;
//     const { body } = req.body;
//     if (!id || !body) return null;
//     try {
//         const user = await usuarios.getById(id);
//         const userPhone = "whatsapp:" + user.phone;
//         await twilio.sendMessage({ to: userPhone, body });
//         await transporter.sendMail({
//             ...config.emailer.options,
//             html: `<p>${body}</p>`
//         });
//         res.send(true);
//     } catch (e) {
//         console.log(e);
//         res.send({ error: 'error in message', message: e.message });
//     }
// });

export default usuariosApiRouter;