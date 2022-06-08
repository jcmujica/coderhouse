import GenericDAO from "./GenericDAO.js";
import { usuariosModel } from "../usuariosModel.js";

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
}