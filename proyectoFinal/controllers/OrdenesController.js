import OrdenesApi from "../api/OrdenesApi.js";
import config from "../config.js";
import UsuariosDAO from "../models/daos/UsuariosDAO.js";
import { cartToTextBody, completeWithWhatasappPrefix, transporter, twilio } from "../utils/index.js";

export default class OrdenesController {
    constructor() {
        this.ordenesApi = new OrdenesApi();
    }

    async getOrder(id) {
        return await this.ordenesApi.getOrder(id);
    }

    async getUserOrders(id) {
        return await this.ordenesApi.getUserOrders(id) || [];
    }

    async createOrder(data) {
        const orderData = {
            total: data.products.reduce((acc, cur) => acc + cur.price, 0),
            status: "PENDING",
            user: data.user,
            items: data.products.length,
            cart: data._id,
            createdAt: new Date()
        };
        const order = await this.ordenesApi.createOrder(orderData);
        console.log({ order })
        // preform calculations
        return []
        try {
            if (!data) {
                return { error: -1, message: 'No se recibieron los datos del carrito' };
            };
            const user = await UsuariosDAO.findByUsername(body.username);
            const { phone } = user;
            const adminPhone = config.RECIPIENT_PHONE;
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