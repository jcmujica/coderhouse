import mongoose from "mongoose";

const carritosCollection = 'carritos';

const CarritosSchema = new mongoose.Schema({
    timestamp: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        required: false
    },
});

export const carritoModel = new mongoose.model(carritosCollection, CarritosSchema);