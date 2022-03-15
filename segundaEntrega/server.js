import express from 'express';
import { initFirebase } from './db/firebase/index.js';
const PORT = process.env.PORT || 8080;
const app = express();
const admin = initFirebase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/auth/role', (req, res) => {
    res.send({ isAdmin: process.env.IS_ADMIN });
});

app.get('*', function (req, res) {
    res.send({ error: -2, descripcion: `ruta 'x' método 'y' no implementada` });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});