import passport from 'passport';
import passportLocal from 'passport-local';
import { logger } from '../utils/index.js';
import bcrypt from "bcrypt";
import UsuariosApi from '../api/UsuariosApi.js';
import config from '../config.js';

const LocalStrategy = passportLocal.Strategy;

const strategyOptions = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
};

const usuariosApi = new UsuariosApi();

const login = async (req, username, password, done) => {
    try {
        const user = (await usuariosApi.getByUsername(username));

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
            logger.warn(`Error, El usuario ${config.ADMIN_EMAIL} ya existe`);
            logger.info(user);
            return done(null, false, {
                message:
                    'Ya existe un usuario registrado con ese email, por favor intenta con otro',
            });
        } else {
            const newUser = await usuariosApi.registerUser(userData);
            logger.info(`Registro exitoso de usuario: ${config.ADMIN_EMAIL}`);
            return done(null, newUser);
        }
    } catch (e) {
        logger.warn(e);
        return done(e);
    }
};

passport.use('login', new LocalStrategy(strategyOptions, login));
passport.use('register', new LocalStrategy(strategyOptions, register));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await usuariosApi.getById(id);
    done(null, user);
});

export const isLoggedIn = (req, res, next,) => {
    if (!req.isAuthenticated()) {
        return {
            error: 'No estás autenticado',
        };
    }

    next();
};

export default passport;
