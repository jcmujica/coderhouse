const fs = require('fs');

const getId = (file) => {
    return file && file.length ? file[file.length - 1].id + 1 : 1;
};

class Contenedor {
    constructor(name) {
        this.name = name;
        this.route = './' + name + '.txt';
    }

    read() {
        try {
            const file = fs.readFileSync(this.route, 'utf8');
            const fileObject = JSON.parse(file);
            return fileObject;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    write(data) {
        try {
            const stringData = JSON.stringify(data);
            fs.writeFileSync(this.route, stringData);
            return true;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    save(data) {
        try {
            const file = this.read();
            data.id = getId(file);
            file.push(data);
            this.write(file);
            return data.id;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    getById(id) {
        try {
            const file = this.read();
            return file.find(item => item.id == id) || { error : 'producto no encontrado' };
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    getAll() {
        try {
            return this.read();
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    updateById(id, data) {
        const products = this.read();
        const product = products.find(item => item.id == id);
        const index = products.indexOf(product);
        products[index] = { ...product, ...data };
        this.write(products);
    }

    deleteById(id) {
        try {
            const file = this.read();
            const newFile = file.filter(item => item.id != id);
            this.write(newFile);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    deleteAll() {
        try {
            this.write([]);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

}

module.exports = Contenedor;