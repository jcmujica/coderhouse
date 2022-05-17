import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import config from './config.js';
import productosApiRouter from './routes/productosApiRouter.js';
import carritosApiRouter from './routes/carritosApiRouter.js';
import usuariosApiRouter from './routes/usuariosApiRouter.js';

const PORT = process.env.PORT || 8080;
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

app.get('*', function (req, res) {
    res.send({ error: -2, descripcion: `ruta $${req.path} o método ${req.method} no implementado` });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});