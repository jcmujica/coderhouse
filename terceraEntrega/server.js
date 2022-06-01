import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import cluster from 'cluster';
import os from 'os';
import config from './config.js';
import productosApiRouter from './routes/productosApiRouter.js';
import carritosApiRouter from './routes/carritosApiRouter.js';
import usuariosApiRouter from './routes/usuariosApiRouter.js';
import { logger } from './utils/logger.js';

const USE_CLUSTER = config.USE_CLUSTER;
const PORT = process.env.PORT || 8080;

if (cluster.isPrimary && USE_CLUSTER) {
    const cpus = os.cpus().length;
    logger.info('CPUS: ', cpus);
    for (var i = 0; i < cpus; i++) {
        cluster.fork();
    }

    cluster.on('exit', worker => {
        cluster.fork()
    });
} else {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(cookieParser());
    app.use(session(config.session));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/api/user', usuariosApiRouter);
    app.use('/api/productos', productosApiRouter);
    app.use('/api/carritos', carritosApiRouter);
    app.use('/', (req, res) => {
        res.send('Hola mundo!');
    });

    app.get('*', function (req, res) {
        res.send({ error: -2, descripcion: `ruta $${req.path} o método ${req.method} no implementado` });
    });

    app.listen(PORT, () => {
        logger.info(`Servidor corriendo en modo:  ${USE_CLUSTER ? 'cluster' : 'single'}`);
        logger.info(`Servidor corriendo en el puerto ${PORT}`);
    });
}