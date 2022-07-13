import OrdenesDAO from "../models/daos/OrdenesDAO.js";

export default class OrdenesApi {
    constructor() {
        this.ordenesDAO = new OrdenesDAO();
    }

    async getOrder(id) {
        return await this.ordenesDAO.getById(id);
    }

    async getUserOrders(id) {
        return await this.ordenesDAO.getUserOrders(id);
    }

    async createOrder(data) {
        return await this.ordenesDAO.create(data);
    }

    async updateOrder(id, data) {
        return await this.ordenesDAO.updateOrder(id, data);
    }

    async deleteOrder(id) {
        return await this.ordenesDAO.deleteById(id);
    }
}