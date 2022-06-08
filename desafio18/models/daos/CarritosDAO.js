import { carritosModel } from "../carritosModel.js";
import GenericDAO from "./GenericDAO.js";

export default class CarritosDAO extends GenericDAO {
    constructor() {
        super(carritosModel, "carritos");
    }
}