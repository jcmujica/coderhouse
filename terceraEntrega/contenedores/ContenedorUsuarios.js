import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { ContenedorMongoDb } from './ContenedorMongoDb.js';
const saltRounds = 10;

export class ContenedorUsuarios extends ContenedorMongoDb {
    constructor(config, model, name) {
        super(config, model, name);
        this.name = name;
        this.mongoose = mongoose.connect(config.cnxStr, config.params);
        this.model = model;
    }

    async login(data) {
        try {
            const { username, password } = data;
            let item = await this.model.findOne({ username: `${username}` });

            if (item) {
                let isValid = await bcrypt.compare(password, item.password);
                if (isValid) {
                    const { password, ...user } = item;
                    return {
                        ...user,
                        _id: item._id.toString()
                    };
                } else {
                    return { error: "invalid password" };
                };
            } else {
                return { error: "invalid username" };
            };
        } catch (e) {
            console.log(e);
            return { error: "error in login" };
        }
    }

    async register(data) {
        try {
            const { password } = data;
            const encryptedPassword = await bcrypt.hash(password, saltRounds);
            let item = await this.model.create({ ...data, password: encryptedPassword });

            if (item) {
                return {
                    ...item,
                    _id: item._id.toString(),
                    _doc: {
                        username: item._doc.username,
                        _id: item._doc._id.toString()
                    }
                };
            } else {
                return { error: "error in register" };
            }
        } catch (e) {
            console.log(e);
            return { error: "error in register catch", message: e.message };
        }
    }
}