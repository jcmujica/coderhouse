import { ordenesModel } from "../ordenesModel.js";
import GenericDAO from "./GenericDAO.js";

export default class OrdenesDAO extends GenericDAO {
    constructor() {
        super(ordenesModel, "ordenes");
    }

    async updateCart(id, data) {
        return await this.model.findOneAndUpdate({ _id: id }, data, { new: true });
    }

    async getUserCart(id) {
        return await this.model.findOne({ user: id });
    }
}