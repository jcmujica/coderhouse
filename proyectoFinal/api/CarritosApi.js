import CarritosDAO from "../models/daos/CarritosDAO.js";

export default class CarritosApi {
    constructor() {
        this.carritosDAO = new CarritosDAO();
    }

    async getCart(id) {
        return await this.carritosDAO.getById(id);
    }

    async getUserCart(id) {
        return await this.carritosDAO.getUserCart(id);
    }

    async getAllCarts() {
        return await this.carritosDAO.getAll();
    }

    async createCart(data) {
        return await this.carritosDAO.create(data);
    }

    async updateCart(id, data) {
        return await this.carritosDAO.updateCart(id, data);
    }

    async deleteCart(id) {
        return await this.carritosDAO.deleteById(id);
    }
}