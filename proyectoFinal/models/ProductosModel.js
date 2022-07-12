import mongoose from "mongoose";

const productosCollection = 'productos';

export const ProductosSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    sku: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
});

export const productosModel = new mongoose.model(productosCollection, ProductosSchema);