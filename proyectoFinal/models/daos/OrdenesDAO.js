import { ordenesModel } from "../ordenesModel.js";
import GenericDAO from "./GenericDAO.js";

export default class OrdenesDAO extends GenericDAO {
    constructor() {
        super(ordenesModel, "ordenes");
    }

    async updateOrder(id, data) {
        return await this.model.findOneAndUpdate({ _id: id }, data, { new: true });
    }

    async getUserOrders(id) {
        return await this.model.find({ user: id });
    }
}