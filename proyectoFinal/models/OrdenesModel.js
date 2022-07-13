import mongoose from "mongoose";
import { ProductosSchema } from "./productosModel.js";

const ordenesCollection = 'ordenes';

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
    products: {
        type: Array,
        required: true
    }
});

export const ordenesModel = new mongoose.model(ordenesCollection, OrdenesSchema);