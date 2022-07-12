import mongoose from "mongoose";
import { ProductosSchema } from "./productosModel.js";

const carritosCollection = 'carritos';

const CarritosSchema = new mongoose.Schema({
    timestamp: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    products: [
        ProductosSchema
    ],
});

export const carritosModel = new mongoose.model(carritosCollection, CarritosSchema); 