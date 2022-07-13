import { carritosModel } from "../CarritosModel.js";
import GenericDAO from "./GenericDAO.js";

export default class CarritosDAO extends GenericDAO {
    constructor() {
        super(carritosModel, "carritos");
    }

    async updateCart(id, data) {
        return await this.model.findOneAndUpdate({ _id: id }, data, { new: true });
    }

    async getUserCart(id) {
        return await this.model.findOne({ user: id });
    }
}