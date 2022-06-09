import UsuariosApi from "../api/UsuariosApi.js";
import bcrypt from "bcrypt";

export default class UsuariosController {
    constructor() {
        this.usuariosApi = new UsuariosApi();
    }

    async getUser(id) {
        return await this.usuariosApi.getById(id);
    }

    async getAllUsers() {
        return await this.usuariosApi.getAllUsers();
    }

    async loginUser(data) {
        return await this.usuariosApi.loginUser(data);
    }

    async registerUser(data) {
        const { password } = data;
        data.password = await bcrypt.hash(password, 10);
        return await this.usuariosApi.registerUser(data);
    }

    async updateUser(id, data) {
        return await this.usuariosApi.updateUser(id, data);
    }

    async deleteUser(id) {
        return await this.usuariosApi.deleteUser(id);
    }

    async purchaseUser(data) {
        return await this.usuariosApi.purchaseUser(data);
    }

    async createAdmin(data) {
        return await this.usuariosApi.createAdmin(data);
    }
}