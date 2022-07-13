import { mensajesModel } from "../MensajesModel.js";
import GenericDAO from "./GenericDAO.js";

export default class MensajesDAO extends GenericDAO {
    constructor() {
        super(mensajesModel, "mensajes");
    }
}