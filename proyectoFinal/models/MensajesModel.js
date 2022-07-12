import mongoose from "mongoose";

const mensajesCollection = 'mensajes';

export const MensajesSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    }
});

export const mensajesModel = new mongoose.model(mensajesCollection, MensajesSchema);