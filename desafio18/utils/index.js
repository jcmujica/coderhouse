import { transporter } from './transporter.js';
import twilio from './twilio.js';
import { logger } from './logger.js';
import { hashPassword } from './hash.js';
import { comparePassword } from './hash.js';

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

export {
    transporter,
    twilio,
    completeWithWhatasappPrefix,
    cartToHtmlBody,
    cartToTextBody,
    logger,
    hashPassword,
    comparePassword
}