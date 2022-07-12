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
            console.log(item);
            return item;
        } catch (e) {
            logger.error(e);
            return {
                error: e,
                message: `Error al crear el item ${this.name}`
            };
        }
    }

    async getById(id) {
        try {
            if (typeof id === 'object') {
                id = id._id;
            }

            let item = await this.model.findById(id);
            return item;
        } catch (e) {
            logger.error(e);
            return {
                error: e,
                message: `Error al obtener el item ${this.name} con id ${id}`
            };
        }
    }

    async getAll() {
        try {
            let items = await this.model.find();
            return items;
        } catch (e) {
            logger.error(e);
            return {
                error: e,
                message: `Error al obtener los items de tipo ${this.name}`
            };
        }
    }

    async updateById(id, data) {
        try {
            await this.model.findByIdAndUpdate(id, data);
            let updatedItem = await this.model.findById(id);
            return updatedItem;
        } catch (e) {
            logger.error(e);
            return {
                error: e,
                message: `Error al actualizar el item ${this.name} con id ${id}`
            };
        }
    }

    async deleteById(id) {
        try {
            let item = await this.model.findByIdAndDelete(id);
            return item;
        } catch (e) {
            logger.error(e);
            return {
                error: e,
                message: `Error al eliminar el item ${this.name} con id ${id}`
            };
        }
    }

    async deleteAll() {
        try {
            let items = await this.model.deleteMany({});
            return items;
        } catch (e) {
            logger.error(e);
            return {
                error: e,
                message: `Error al eliminar lost items ${this.name}`
            };
        }
    }

    async findByProperty(property, value) {
        try {
            let item = await this.model.findOne({ [property]: value });
            return item;
        } catch (e) {
            logger.error(e);
            return {
                error: e,
                message: `Error al buscar el item ${this.name} con propiedad ${property}`
            };
        }
    }

    async findByPropertyArray(property, value) {
        try {
            let items = await this.model.find({ [property]: value });
            return items;
        } catch (e) {
            logger.error(e);
            return {
                error: e,
                message: `Error al buscar los items ${this.name} con propiedad ${property}`
            };
        }
    }
};