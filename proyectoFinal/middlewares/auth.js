import passport from 'passport';
import passportJwt from 'passport-jwt';
import { logger } from '../utils/index.js';
import bcrypt from "bcrypt";
import UsuariosApi from '../api/UsuariosApi.js';
import config from '../config.js';
import { Unauthorized } from '../errors/index.js';
import jwt from 'jsonwebtoken';

const Strategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const strategyOptions = {
    usernameField: 'username',
    passwordField: 'password',
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET,
};

const usuariosApi = new UsuariosApi();

const getUser = async (username) => {
    const user = await usuariosApi.getByUsername(username);
    return user;
};

const login = async (req, res, next) => {
    try {
        const { username = '', password = '' } = req.body;
        const user = await getUser(username);

        if (!user) {
            const error = `Login fallido para usuario ${username}: El usuario no existe`
            logger.warn(error);
            res.status(200).json({ error: error });
            return;
        }

        const match = await bcrypt.compare(password, user?.password);
        if (!match) {
            logger.warn(
                `Login fallido para usuario ${username}: La contraseña es incorrecta`,
            );
            return next();
        };

        const jwtPayload = {
            id: user.id,
            username: user.username
        };

        jwt.sign(jwtPayload, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRATION_TIME }, (err, token) => {
            if (err) {
                logger.error(err);
                return next(err);
            };

            req.user = { user: jwtPayload, token: `Bearer ${token}` };

            logger.info(`Login exitoso de usuario: ${username}`);

            return next();
        });
    } catch (e) {
        logger.warn(e);
        return next(e);
    }
};

const register = async (req, res, next) => {
    try {
        const { username = '', password = '' } = req.body;
        let userData = {
            ...req.body,
            admin: false,
        };

        const user = await getUser(username);

        if (user) {
            const error = `Error, El usuario ${username} ya existe`;
            logger.warn(error);
            logger.info(user);
            res.status(400).json({ error: error });
        } else {
            const hash = await bcrypt.hash(password, 10);
            userData = {
                ...userData,
                password: hash,
            };

            const newUser = await usuariosApi.createUser(userData);

            if (newUser.error) {
                logger.warn(`Error, no se pudo crear el usuario ${username}`);
                logger.info(newUser);
                res.status(400).json({ error: newUser.error });

                return next();
            };

            const jwtPayload = {
                id: newUser.id,
                username: newUser.username
            };

            jwt.sign(jwtPayload, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRATION_TIME }, (err, token) => {
                if (err) {
                    logger.error(err);
                    return next(err);
                };

                req.user = { user: jwtPayload, token: `Bearer ${token}` };

                logger.info(`Registro exitoso de usuario: ${username}`);

                return next();
            });
        }
    } catch (e) {
        logger.warn(e);
        return next();
    }
};

const isAuth = passport.authenticate('jwt', { session: false });

passport.use(new Strategy(strategyOptions, async (jwt_payload, done) => {
    try {
        const user = await getUser(jwt_payload.username);
        if (!user) {
            const error = `Usuario no autorizado`;
            logger.warn(error);
            return done(error, false);
        } else {
            return done(null, user);
        };
    } catch (e) {
        logger.warn(e);
        return done(e);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (id, done) => {
    const user = await usuariosApi.getById(id);
    done(null, user);
});

const isAdmin = (req, res, next) => {
    const isAdmin = req?.user?.admin;
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
    isAuth,
    isAdmin,
    isSelf,
    login,
    register,
};
