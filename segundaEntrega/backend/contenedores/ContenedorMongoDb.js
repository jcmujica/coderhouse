import mongoose from 'mongoose';
export class ContenedorMongoDb {
    constructor(config, model, name) {
        this.name = name;
        this.mongoose = mongoose.connect(config.cnxStr, config.params);
        this.model = model;
    }

    async create(data) {
        try {
            let item = await this.model.create(data);
            return item;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async getById(id) {
        try {
            let item = await this.model.findById(id);
            return item;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async getAll() {
        try {
            let items = await this.model.find();
            return items;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async updateById(id, data) {
        try {
            await this.model.findByIdAndUpdate(id, data);
            let updatedItem = await this.model.findById(id);
            return updatedItem;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async deleteById(id) {
        try {
            let item = await this.model.findByIdAndDelete(id);
            return item;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async deleteAll() {
        try {
            let items = await this.model.deleteMany({});
            return items;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async cartUpdateProductById(id, data) {
        try {
            let cart = await this.model.findById(id);
            let product = cart.products.find(product => product.id === data.id);
            let indexOfProduct = cart.products.indexOf(product);
            cart.products[indexOfProduct] = data;
            await cart.save();
            let updatedCart = await this.model.findById(id);
            return updatedCart;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async cartDeleteProductById(id, productId) {
        try {
            let cart = await this.model.findById(id);
            cart.products = cart.products.filter(product => product.id !== productId);
            await cart.save();
            let updatedCart = await this.model.findById(id);
            return updatedCart;
        } catch (e) {
            console.log(e);
            return null;
        }
    }
};