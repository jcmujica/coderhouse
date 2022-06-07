import { carritosModel } from "../carritosModel";
import { GenericDAO } from "./GenericDAO";

export default class CarritosDAO extends GenericDAO {
    constructor() {
        super(carritosModel, "carritos");
    }

    async cartUpdateProductById(id, data) {
        try {
            let cart = await this.model.findById(id);
            let product = cart.products.find(product => product.id === data.id);

            if (product) {
                let indexOfProduct = cart.products.indexOf(product);
                cart.products[indexOfProduct] = data;
            } else {
                cart.products.push(data);
            };
            await cart.save();
            let updatedCart = await this.model.findById(id);
            return updatedCart;
        } catch (e) {
            logger.error(e);
            return null;
        }
    }

    async cartDeleteProductById(id, productId) {
        try {
            let cart = await this.model.findById(id);
            cart.products = cart.products.filter(product => product.id !== parseInt(productId));
            await cart.save();
            let updatedCart = await this.model.findById(id);
            return updatedCart;
        } catch (e) {
            logger.error(e);
            return null;
        }
    }
}