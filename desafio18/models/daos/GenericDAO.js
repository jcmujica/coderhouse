import mongoose from 'mongoose';
import { logger } from '../../utils/logger.js';
import config from '../../config.js';

export default class GenericDAO {
    constructor(model, name) {
        this.name = name;
        this.mongoose = mongoose.connect(config.mongoDb.cnxStr, config.mongoDb.params);
        this.model = model;
    }

    async create(data) {
        try {
            let item = await this.model.create(data);
            return item;
        } catch (e) {
            logger.error(e);
            return null;
        }
    }

    async getById(id) {
        try {
            let item = await this.model.findById(id);
            return item;
        } catch (e) {
            logger.error(e);
            return null;
        }
    }

    async getAll() {
        try {
            let items = await this.model.find();
            return items;
        } catch (e) {
            logger.error(e);
            return null;
        }
    }

    async updateById(id, data) {
        try {
            await this.model.findByIdAndUpdate(id, data);
            let updatedItem = await this.model.findById(id);
            return updatedItem;
        } catch (e) {
            logger.error(e);
            return null;
        }
    }

    async deleteById(id) {
        try {
            let item = await this.model.findByIdAndDelete(id);
            return item;
        } catch (e) {
            logger.error(e);
            return null;
        }
    }

    async deleteAll() {
        try {
            let items = await this.model.deleteMany({});
            return items;
        } catch (e) {
            logger.error(e);
            return null;
        }
    }
};