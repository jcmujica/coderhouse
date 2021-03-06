import express from 'express';
const PORT = process.env.PORT || 8080;
const app = express();
import productosApiRouter from './routes/productosApiRouter.js';
import carritosApiRouter from './routes/carritosApiRouter.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', productosApiRouter);
app.use('/api/carritos', carritosApiRouter);

app.get('*', function (req, res) {
    res.send({ error: -2, descripcion: `ruta 'x' método 'y' no implementada` });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT} con configuracion para: ${process.env.DB}`);
});