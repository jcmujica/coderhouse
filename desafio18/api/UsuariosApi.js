import UsuariosDAO from "../models/daos/UsuariosDAO.js";
import { logger } from "../utils/logger.js";

export default class UsuariosApi {
    constructor() {
        this.usuariosDAO = new UsuariosDAO();
    }

    async getByUsername(username) {
        return await this.usuariosDAO.getByUserName(username);
    }

    async getById(id) {
        return await this.usuariosDAO.getById(id);
    }

    async getAllUsers() {
        return await this.usuariosDAO.getAll();
    }

    async loginUser(data) {
        try {
            return { user: { ...data._doc, password: undefined } };
        } catch (e) {
            logger.log(e);
            return { error: -1, error: e, message: 'Error in login' };
        }
    }

    async registerUser(data) {
        try {
            const user = await this.usuariosDAO.create(data);
            return { user: { ...user._doc, password: undefined } };
        } catch (e) {
            logger.log(e);
            return { error: -1, error: e, message: 'Error in register' };
        }
    }

    async updateUser(id, data) {
        return await this.usuariosDAO.updateById(id, data);
    }

    async deleteUser(id) {
        return await this.usuariosDAO.deleteById(id);
    }

    async createAdmin(data) {
        return await this.usuariosDAO.createAdmin(data);
    }
}