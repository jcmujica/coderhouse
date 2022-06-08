import UsuariosApi from "../api/UsuariosApi.js";

export default class UsuariosController {
    constructor() {
        this.usuariosApi = new UsuariosApi();
    }

    async getUser(id) {
        return await this.usuariosApi.getUser(id);
    }

    async getAllUsers() {
        return await this.usuariosApi.getAllUsers();
    }

    async loginUser(data) {
        return await this.usuariosApi.loginUser(data);
    }

    async registerUser(data) {
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
}