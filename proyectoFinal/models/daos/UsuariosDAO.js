import GenericDAO from "./GenericDAO.js";
import { usuariosModel } from "../UsuariosModel.js";

export default class UsuariosDAO extends GenericDAO {
    constructor() {
        super(usuariosModel, "usuarios");
    }

    async getByUserName(userName) {
        try {
            let item = await this.findByProperty('username', userName);
            return item;
        } catch (e) {
            logger.error(e);
            return {
                error: e,
                message: `Error al obtener el item ${this.name} con userName ${userName}`
            };
        }
    }

    async createAdmin(data) {
        try {
            let item = await this.create(data);
            return item;
        } catch (e) {
            logger.error(e);
            return {
                error: e,
                message: `Error al crear el item ${this.name}`
            };
        }
    }
}