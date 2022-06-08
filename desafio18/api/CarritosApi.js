import CarritosDAO from "../models/daos/CarritosDAO.js";
import UsuariosDAO from "../models/daos/UsuariosDAO.js";

export default class CarritosApi {
    constructor() {
        this.carritosDAO = new CarritosDAO();
    }

    async getCart(id) {
        return await this.carritosDAO.getById(id);
    }

    async getAllCarts() {
        return await ßthis.carritosDAO.getAll();
    }

    async createCart(data) {
        return await this.carritosDAO.create(data);
    }

    async updateCart(id, data) {
        return await this.carritosDAO.updateById(id, data);
    }

    async deleteCart(id) {
        return await this.carritosDAO.deleteById(id);
    }

    async purchaseCart(data) {
        try {
            if (!data) {
                return { error: -1, descripcion: 'No se recibieron los datos del carrito' };
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
            res.send(true);
        } catch (e) {
            logger.error(e);
            res.send({ error: 'error in message', message: e.message });
        }
        return await this.carritosApi.purchaseCart(data);
    }
}