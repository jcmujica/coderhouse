import passport from 'passport';
import passportJwt from 'passport-jwt';
import { logger } from '../utils/index.js';
import bcrypt from "bcrypt";
import UsuariosApi from '../api/UsuariosApi.js';
import config from '../config.js';
import { Unauthorized } from '../errors/index.js';

const Strategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const strategyOptions = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET,
};

const usuariosApi = new UsuariosApi();

const login = async (req, username, password, done) => {
    try {
        const user = await usuariosApi.getByUsername(username);

        if (!user) {
            logger.warn(`Login fallido para usuario ${username}: El usuario no existe`);
            return done(null, false);
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            logger.warn(
                `Login fallido para usuario ${username}: La contraseña es incorrecta`,
            );
            return done(null, false);
        }

        logger.warn(`Login exitoso de usuario ${username}, ${new Date()}`);
        return done(null, user);

    } catch (e) {
        logger.warn(e);
        return done(e);
    }
};

const register = async (req, username, password, done) => {
    try {
        const userData = {
            ...req.body,
            admin: false,
        };

        const user = await usuariosApi.getByUsername(username);

        if (user) {
            logger.warn(`Error, El usuario ${req.body.username} ya existe`);
            logger.info(user);
            return done(null, false, {
                message:
                    'Ya existe un usuario registrado con ese email, por favor intenta con otro',
            });
        } else {
            logger.info(`Registro exitoso de usuario: ${config.ADMIN_EMAIL}`);
            return done(null, userData);
        }
    } catch (e) {
        logger.warn(e);
        return done(e);
    }
};

passport.use('login', new Strategy(strategyOptions, login));
passport.use('register', new Strategy(strategyOptions, register));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (id, done) => {
    const user = await usuariosApi.getById(id);
    done(null, user);
});

const isLoggedIn = (req, res, next) => {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
        throw new Unauthorized('El usuario no ha inciado sesion');
    }

    next();
};

const isAdmin = (req, res, next) => {
    const isAdmin = req.user.admin;
    if (!isAdmin) {
        throw new Unauthorized('No esta autorizado para realizar esta accion');
    }

    next();
};

const isSelf = (req, res, next) => {
    const isSelf = req.user.id === req.params.id;
    if (!isSelf) {
        throw new Unauthorized('No esta autorizado para realizar esta accion');
    }

    next();
};

export {
    passport,
    isLoggedIn,
    isAdmin,
    isSelf,
};
