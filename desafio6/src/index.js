const express = require('express');
const app = express();
const multer = require('multer');
const PORT = process.env.PORT || 8080;
const Contenedor = require('./contenedor');
const productos = new Contenedor('productos');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('<h1>Bienvenido a la app de express</h1>');
});

app.use('/static', express.static('public'));



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});