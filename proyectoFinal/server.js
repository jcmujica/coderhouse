import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { passport } from './middlewares/auth.js';
import cluster from 'cluster';
import os from 'os';
import config from './config.js';
import ProductosRouter from './routes/ProductosRouter.js';
import CarritosRouter from './routes/CarritosRouter.js';
import UsuariosRouter from './routes/UsuariosRouter.js';
import { logger } from './utils/logger.js';

const USE_CLUSTER = config.USE_CLUSTER;
const PORT = process.env.PORT || 8080;

// if (cluster.isPrimary && USE_CLUSTER) {
if (false) {
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
    app.use(passport.initialize());

    app.use('/api/user', new UsuariosRouter().start());
    app.use('/api/productos', new ProductosRouter().start());
    app.use('/api/carritos', new CarritosRouter().start());
    app.use('/', (req, res) => {
        res.send('Hola mundo!');
    });

    app.get('*', function (req, res) {
        res.send({ error: -2, descripcion: `ruta $${req.path} o método ${req.method} no implementado` });
    });

    app.listen(PORT, () => {
        logger.info(`Servidor corriendo en modo: ${USE_CLUSTER ? 'cluster' : 'single'} en puerto ${PORT}`);
    });
}