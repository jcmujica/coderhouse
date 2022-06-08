import CarritosApi from "../api/CarritosApi.js";

export default class CarritosController {
    constructor() {
        this.carritosApi = new CarritosApi();
    }

    async getCart(id) {
        return await this.carritosApi.getCart(id);
    }

    async getAllCarts() {
        return this.carritosApi.getAllCarts();
    }

    async createCart(data) {
        return await this.carritosApi.createCart(data);
    }

    async updateCart(id, data) {
        return await this.carritosApi.updateCart(id, data);
    }

    async deleteCart(id) {
        return await this.carritosApi.deleteCart(id);
    }

    async purchaseCart(data) {
        return await this.carritosApi.purchaseCart(data);
    }
}