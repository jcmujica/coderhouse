import OrdenesApi from "../api/OrdenesApi.js";
import CarritosApi from "../api/CarritosApi.js";
import UsuariosApi from "../api/UsuariosApi.js";
import config from "../config.js";
import UsuariosDAO from "../models/daos/UsuariosDAO.js";
import { cartToTextBody, completeWithWhatasappPrefix, transporter, twilio } from "../utils/index.js";

export default class OrdenesController {
    constructor() {
        this.ordenesApi = new OrdenesApi();
        this.carritosApi = new CarritosApi();
        this.usuariosApi = new UsuariosApi();
    }

    async getOrder(id) {
        return await this.ordenesApi.getOrder(id);
    }

    async getUserOrders(id) {
        return await this.ordenesApi.getUserOrders(id) || [];
    }

    async createOrder(data) {
        try {
            if (!data) {
                return { error: -1, message: 'No se recibieron los datos del carrito' };
            };
            // prepare order data
            const orderData = {
                total: data.products.reduce((acc, cur) => acc + cur.price, 0),
                status: "PENDING",
                user: data.user,
                items: data.products.length,
                products: data.products.map(product => product?._id),
                cart: data._id,
                createdAt: new Date()
            };
            await this.ordenesApi.createOrder(orderData);
            // delete order.cart;
            await this.carritosApi.deleteCart(data._id);
            // Notify user
            const user = await this.usuariosApi.getById(data.user);
            const { phone } = user;
            console.log({ phone })
            return;
            const adminPhone = config.RECIPIENT_PHONE;
            await transporter.sendMail({
                ...config.emailer.options,
                html: cartToHtmlBody(body)
            });
            await twilio.sendMessage({
                to: completeWithWhatasappPrefix(adminPhone),
                body: cartToTextBody(body, ROLES.ADMIN),
            });
            await twilio.sendMessage({
                to: completeWithWhatasappPrefix(phone),
                body: cartToTextBody(body, ROLES.USER),
            });
            return await this.ordenesApi.createOrder(data);
        } catch (e) {
            logger.error(e);
            return { error: 'error in message', message: e.message };
        }
    }

    async updateOrder(id, data) {
        return await this.ordenesApi.updateOrder(id, data);
    }

    async deleteOrder(id) {
        return await this.ordenesApi.deleteOrder(id);
    }
}