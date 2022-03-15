
const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const productos = require('./routes/productos');
const carritos = require('./routes/carritos');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/auth/role', (req, res) => {
    res.send({ isAdmin: process.env.IS_ADMIN });
});

app.use('/api/productos', productos);
app.use('/api/carritos', carritos);

app.get('*', function (req, res) {
    res.send({ error: -2, descripcion: `ruta 'x' método 'y' no implementada` });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});