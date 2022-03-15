import { Router } from 'express';
import { ProductosDaoFirebase } from '../daos/productos/ProductosDaoFirebase.js';
const productos = process.env.DB === 'firebase' ? ProductosDaoFirebase : 'import mongodb';

const productosApiRouter = new Router();

productosApiRouter.get('/:id', (req, res, next) => {
    res.send(productos.getById(req.params.id));
});

// productosApiRouter.post('/', (req, res, next) => {
//     if (isAdmin) {
//         const newProductID = productos.save(req.body);
//         res.send(productos.getById(newProductID));
//     } else {
//         res.send({ error: 401, descripcion: `Solo disponible para administradores` });
//     };
// });

// productosApiRouter.put('/:id', (req, res, next) => {
//     if (isAdmin) {
//         const productId = req.params.id;
//         const inputData = req.body;
//         productos.updateById(productId, inputData);
//         res.send(productos.getAll());
//     } else {
//         res.send({ error: 401, descripcion: `Solo disponible para administradores` });
//     };
// });

// productosApiRouter.delete('/:id', (req, res, next) => {
//     if (isAdmin) {
//         const productId = req.params.id;
//         productos.deleteById(productId);
//         res.send(productos.getAll());
//     } else {
//         res.send({ error: 401, descripcion: `Solo disponible para administradores` });
//     }
// });

export default productosApiRouter;