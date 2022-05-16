import mongoose from "mongoose";

const usuariosCollection = 'usuarios';

const UsuariosSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    age: {
        type: Number,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    avatar: {
        type: String,
        required: false
    }
});

export const usuariosModel = new mongoose.model(usuariosCollection, UsuariosSchema);