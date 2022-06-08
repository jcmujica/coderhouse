import UsuariosDAO from "../models/daos/UsuariosDAO.js";

export default class UsuariosApi {
    constructor() {
        this.usuariosDAO = new UsuariosDAO();
    }

    async getUser(id) {
        return await this.usuariosDAO.getById(id);
    }

    async getAllUsers() {
        return await this.usuariosDAO.getAll();
    }

    async createUser(data) {
        return await this.usuariosDAO.create(data);
    }

    async updateUser(id, data) {
        return await this.usuariosDAO.updateUser(id, data);
    }

    async deleteUser(id) {
        return await this.usuariosDAO.deleteById(id);
    }
}