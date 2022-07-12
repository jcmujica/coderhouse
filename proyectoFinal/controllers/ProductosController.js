import ProductosApi from "../api/ProductosApi.js";

export default class ProductosController {
    constructor() {
        this.productosApi = new ProductosApi();
    }

    async getProduct(id) {
        return await this.productosApi.getProduct(id);
    }

    async getProductByCategory(category) {
        return await this.productosApi.getProductByCategory(category);
    }

    async getAllProducts() {
        return this.productosApi.getAllProducts();
    }

    async createProduct(data) {
        return await this.productosApi.createProduct(data);
    }

    async updateProduct(id, data) {
        return await this.productosApi.updateProduct(id, data);
    }

    async deleteProduct(id) {
        return await this.productosApi.deleteProduct(id);
    }
}