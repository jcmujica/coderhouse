import { productosModel } from "../productosModel.js";
import GenericDAO from "./GenericDAO.js";

export default class ProductosDAO extends GenericDAO {
    constructor() {
        super(productosModel, "productos");
    }

    async getByCategory(category) {
        return await this.findByPropertyArray("category", category);
    }
}