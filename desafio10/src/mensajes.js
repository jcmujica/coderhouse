

class Productos {
    constructor({ name, options }) {
        this.name = name;
        this.knex = require('knex')(options);
    }

    save(data) {
        return new Promise((resolve, reject) => {
            this.knex.insert(data)
                .into(this.name)
                .then((data) => resolve(data))
                .catch(e => reject(e));
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            this.knex.table(this.name)
                .where('id', id)
                .then((data) => resolve(data))
                .catch(e => reject(e));
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            this.knex.select('*')
                .from(this.name)
                .then(data => resolve(data))
                .catch(e => reject({ message: 'opetation failed', error: e }));
        });
    }

    updateById(id, data) {
        return new Promise((resolve, reject) => {
            this.knex.table(this.name)
                .where('id', id)
                .update(data)
                .then((data) => resolve(data))
                .catch(e => reject(e));
        });
    }

    deleteById(id) {
        return new Promise((resolve, reject) => {
            this.knex.table(this.name)
                .where('id', id)
                .del()
                .then((data) => resolve(data))
                .catch(e => reject(e));
        });
    }

    deleteAll() {
        return new Promise((resolve, reject) => {
            this.knex.table(this.name)
                .del()
                .then((data) => resolve(data))
                .catch(e => reject(e));
        });
    }

}

module.exports = Productos;