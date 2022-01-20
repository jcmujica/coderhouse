const express = require('express');
const app = express();
const router = express.Router();
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
app.use('/api/productos', router);

router.get('/', (req, res) => {
    const products = productos.getAll();
    res.send(products);
});

router.get('/:id', (req, res) => {
    const product = productos.getById(req.params.id);
    res.send(product);
});

router.post('/', upload.single('file'), (req, res) => {
    const file = req.file;
    req.body.thumbnail = file.path;
    const newProductID = productos.save(req.body);
    return res.send(productos.getById(newProductID));
});

router.put('/:id', (req, res) => {
    const productId = req.params.id;
    const inputData = req.body;
    productos.updateById(productId, inputData);
    return res.send(productos.getAll());
});

router.delete('/:id', (req, res) => {
    const productId = req.params.id;
    productos.deleteById(productId);
    return res.send(productos.getAll());
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});