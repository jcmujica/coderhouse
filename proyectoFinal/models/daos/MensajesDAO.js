import { mensajesModel } from "../mensajesModel.js";
import GenericDAO from "./GenericDAO.js";

export default class MensajesDAO extends GenericDAO {
    constructor() {
        super(mensajesModel, "mensajes");
    }
}