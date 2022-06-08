import UsuariosDAO from "../models/daos/UsuariosDAO.js";
import { logger } from "../utils/logger.js";
import bcrypt from "bcrypt";

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

    async loginUser(data) {
        try {
            const { username, password } = data;
            const user = await this.usuariosDAO.findByProperty({ username });
            if (!user) {
                return { error: -1, descripcion: "Usuario no encontrado" };
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return { error: -1, descripcion: "Contraseña incorrecta" };
            }
            return { user: { ...user._doc, password: undefined } };
        } catch (e) {
            logger.log(e);
            return { error: -1, error: e, message: 'Error in login' };
        }
    }

    async registerUser(data) {
        try {
            const { username, password } = data;
            const user = await this.usuariosDAO.findByProperty({ username });
            if (user) {
                return { error: -1, descripcion: "El usuario ya existe" };
            }
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            data.password = hash;
            return await this.usuariosDAO.create(data);
        } catch (e) {
            logger.log(e);
            return { error: -1, error: e, message: 'Error in register' };
        }
    }

    async updateUser(id, data) {
        return await this.usuariosDAO.updateUser(id, data);
    }

    async deleteUser(id) {
        return await this.usuariosDAO.deleteById(id);
    }
}