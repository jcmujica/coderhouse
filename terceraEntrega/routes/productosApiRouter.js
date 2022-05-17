import { Router } from 'express';
import { config as dotEnvConfig } from 'dotenv';
import { ProductosDaoMongoDb } from '../daos/ProductosDao.js';
import { transporter, twilio } from '../utils/index.js';
import config from '../config.js';
import { UsuariosDao } from '../daos/UsuariosDao.js';
dotEnvConfig();
const productos = ProductosDaoMongoDb;

const productosApiRouter = new Router();

const ROLES = {
    ADMIN: 'ADMIN',
    USER: 'USER'
};

const completeWithWhatasappPrefix = (phone) => {
    // if phone starts with +, add whatasapp prefix
    if (phone.startsWith('+')) {
        return `whatsapp:${phone}`;
    } else {
        return `${phone}`;
    }
};

const cartToHtmlBody = (cart) => {
    const cartListToString = cart.products.map(item => `
        <li>
            <img src="${item.image}" />
            <span>${item.name}</span>
            <span>${item.price}</span>
        </li>
    `).join('');


    return `
        <h1>Nueva compra de: ${cart.username}</h1>
        <ul>
            ${cartListToString}
        </ul>
    `;
};

const cartToTextBody = (cart, role) => {
    const cartListToString = cart.products.map(item => `
    - ${item.name} - ${item.price}
    `).join('\n');

    const title = role === ROLES.ADMIN ? 'Nueva compra de: ' : 'Pedido recibido y en proceso: ';

    return `
        ${title} ${cart.username}
        ${cartListToString}
    `;
};

productosApiRouter.get('/:id', (req, res, next) => {
    productos.getById(req.params.id).then(producto => {
        res.send(producto);
    })
});

productosApiRouter.get('/', (req, res, next) => {
    productos.getAll().then(productos => {
        res.send(productos);
    });
});

productosApiRouter.post('/', (req, res, next) => {
    productos.create(req.body).then(result => {
        res.send(result);
    });
});

productosApiRouter.put('/:id', (req, res, next) => {
    productos.updateById(req.params.id, req.body).then(result => {
        res.send(result);
    });
});

productosApiRouter.delete('/:id', (req, res, next) => {
    productos.deleteById(req.params.id).then(result => {
        res.send(result);
    });
});

productosApiRouter.post('/purchase', async (req, res) => {
    const { body } = req;
    if (!body) {
        res.send({ error: -1, descripcion: 'No se recibieron los datos del carrito' });
        return;
    };
    try {
        const user = await UsuariosDao.findByUsername(body.username);
        const { phone } = user;
        const adminPhone = process.env.RECIPIENT_PHONE;
        await twilio.sendMessage({
            to: completeWithWhatasappPrefix(adminPhone),
            body: cartToTextBody(body, ROLES.ADMIN),
        });
        await twilio.sendMessage({
            to: completeWithWhatasappPrefix(phone),
            body: cartToTextBody(body, ROLES.USER),
        });
        await transporter.sendMail({
            ...config.emailer.options,
            html: cartToHtmlBody(body)
        });
        res.send(true);
    } catch (e) {
        logger.error(e);
        res.send({ error: 'error in message', message: e.message });
    }
});

export default productosApiRouter;