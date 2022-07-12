import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { passport } from './middlewares/auth.js';
import cluster from 'cluster';
import os from 'os';
import config from './config.js';
import ProductosRouter from './routes/ProductosRouter.js';
import CarritosRouter from './routes/CarritosRouter.js';
import UsuariosRouter from './routes/UsuariosRouter.js';
import ConfigRouter from './routes/ConfigRouter.js';
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
    const httpServer = new HttpServer(app);
    const io = new IOServer(httpServer);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(cookieParser());
    app.use(passport.initialize());
    app.set('socketio', io);

    app.use('/api/user', new UsuariosRouter().start());
    app.use('/api/config', new ConfigRouter().start());
    app.use('/api/productos', new ProductosRouter().start());
    app.use('/api/carritos', new CarritosRouter().start());

    io.on('connection', (socket) => {
        logger.info('Cliente conectado');
        try {
            socket.emit('listMessages', { message: 'Bienvenido al chat' });
            socket.on('submitMessage', (data) => {
                logger.info('Mensaje recibido: ', data);
                io.emit('newMessage', { message: data.message });
            });
        } catch (e) {
            logger.error(e);
        }
    });

    app.get('*', function (req, res) {
        res.json({ error: -2, descripcion: `ruta $${req.path} o método ${req.method} no implementado` });
    });

    app.listen(PORT, () => {
        logger.info(`Servidor corriendo en modo: ${USE_CLUSTER ? 'cluster' : 'single'} en puerto ${PORT}`);
    });
}