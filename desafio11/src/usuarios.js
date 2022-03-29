const mongoose = require('mongoose');

class Usuarios {
    constructor(config, model, name) {
        this.name = name;
        this.mongoose = mongoose.connect(config.cnxStr, config.params);
        this.model = model;
    }

    async login(data) {
        try {
            const { username, password } = data;
            let item = await this.model.find({ username, password });
            return item;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async register(data) {
        try {
            const { username, password } = data;
            let item = await this.model.create({ username, password });
            return item;
        } catch (e) {
            console.log(e);
            return null;
        }
    }
};

module.exports = Usuarios;