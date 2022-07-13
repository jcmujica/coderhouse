import mongoose from "mongoose";

const ordenesCollection = 'ordenes';

const OrderProducts = new mongoose.Schema({
    product: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const OrdenesSchema = new mongoose.Schema({
    createdAt: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    items: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    products: [OrderProducts]
});

export const ordenesModel = new mongoose.model(ordenesCollection, OrdenesSchema);