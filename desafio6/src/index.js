const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8080;
const VIEW_ENGINE = process.env.VIEW_ENGINE || 'hbs';
const Contenedor = require('./contenedor');
const app = express();
const productos = new Contenedor('productos');
const utils = require('./utils');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', VIEW_ENGINE);
app.engine(VIEW_ENGINE, utils.getSelectedEngine(VIEW_ENGINE));
app.set('views', path.join(__dirname, `../views/${VIEW_ENGINE}`));

app.get('/', (req, res) => {
    res.render('main', {
        productos: productos.getAll(),
        layout: 'index'
    })
});

app.get('/productos', (req, res) => {
    res.render('productos', {
        productos: productos.getAll(),
        layout: 'index',
    })
});

app.post('/productos', (req, res) => {
    console.log(req.body);
    productos.save(req.body);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Using view engine: ${VIEW_ENGINE}`);
    console.log(`Server listening on port ${PORT}`);
});

app.on('error', (err) => { console.error(err) });