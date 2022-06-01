import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { logger } from '../utils/logger.js';
const saltRounds = 10;
export class ContenedorUsuarios {
    constructor(config, model, name) {
        this.name = name;
        this.mongoose = mongoose.connect(config.cnxStr, config.params);
        this.model = model;
    }

    async findByUsername(username) {
        try {
            const user = await this.model.findOne({ username: `${username}` });
            return user;
        } catch (e) {
            logger.error(e);
            return { error: "error in findByUsername" };
        }
    }

    async findOrCreate(data) {
        try {
            const user = await this.model.findOne({ username: `${data.username}` });
            if (user) {
                return { error: "user already exists" };
            } else {
                const { password } = data;
                const encryptedPassword = await bcrypt.hash(password, saltRounds);
                let item = await this.model.create({ ...data, password: encryptedPassword });
                if (item._doc) {
                    return { ...item._doc };
                } else {
                    return { error: "error in registry" };
                }
            }
        } catch (e) {
            logger.error(e);
            return { error: "error in findOrCreate" };
        }
    }
}