import ProductosDAO from "../models/daos/ProductosDAO.js";

export default class ProductosApi {
    constructor() {
        this.productosDAO = new ProductosDAO();
    }

    async getProduct(id) {
        return await this.productosDAO.getById(id);
    }

    async getAllProducts() {
        return await this.productosDAO.getAll();
    }

    async createProduct(data) {
        return await this.productosDAO.create(data);
    }

    async updateProduct(id, data) {
        return await this.productosDAO.updateById(id, data);
    }

    async deleteProduct(id) {
        return await this.productosDAO.deleteById(id);
    }

    async getProductByCategory(category) {
        return await this.productosDAO.getByCategory(category);
    }
}