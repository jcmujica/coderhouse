import MensajesApi from "../api/MensajesApi.js";

export default class MansajesController {
    constructor() {
        this.mensajesApi = new MensajesApi();
    }

    async getMessages() {
        return await this.mensajesApi.getMessages();
    }

    async createMessage(data) {
        return await this.mensajesApi.createMessage(data);
    }
}