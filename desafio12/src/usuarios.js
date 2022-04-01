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
            let item = await this.model.findOne({ username: `${username}` });

            if (item.password === password) {
                return {
                    ...item,
                    _id: item._id.toString()
                };
            } else {
                return { error: "invalid password" };
            };
        } catch (e) {
            console.log(e);
            return { error: "error in login" };
        }
    }

    async register(data) {
        try {
            const { username, password } = data;
            let item = await this.model.create({ username, password });

            if (item) {
                return {
                    ...item,
                    _id: item._id.toString()
                };
            } else {
                return { error: "error in register" };
            }
        } catch (e) {
            console.log(e);
            return { error: "error in register" };
        }
    }
};

module.exports = Usuarios;