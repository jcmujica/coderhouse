import { GenericDAO } from "./GenericDAO";
import { usuariosModel } from "../usuariosModel";

export default class UsuariosDAO extends GenericDAO {
    constructor() {
        super(usuariosModel, "usuarios");
    }
}