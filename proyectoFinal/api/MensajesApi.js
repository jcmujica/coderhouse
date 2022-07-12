import MensajesDAO from "../models/daos/MensajesDAO.js";

export default class MensajesApi {
    constructor() {
        this.mensajesDAO = new MensajesDAO();
    }

    async getMessages() {
        const messages = await this.mensajesDAO.getAll();
        return messages || [];
    }

    async createMessage(data) {
        const message = await this.mensajesDAO.create(data);
        return message;
    }
}