import GenericDAO from "./GenericDAO.js";
import { usuariosModel } from "../usuariosModel.js";

export default class UsuariosDAO extends GenericDAO {
    constructor() {
        super(usuariosModel, "usuarios");
    }
}