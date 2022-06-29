import { productosModel } from "../productosModel.js";
import GenericDAO from "./GenericDAO.js";

export default class ProductosDAO extends GenericDAO {
    constructor() {
        super(productosModel, "productos");
    }
}