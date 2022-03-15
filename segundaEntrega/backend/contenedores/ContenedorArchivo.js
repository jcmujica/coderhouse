import fs from 'fs';

const getId = (file) => {
    return file && file.length ? file[file.length - 1].id + 1 : 1;
};

export class ContenedorArchivo {
    constructor(name) {
        this.name = name;
        this.route = './backend/static/' + name + '.txt';
    }

    async read() {
        try {
            const file = fs.readFileSync(this.route, 'utf8');
            const fileObject = JSON.parse(file);
            return fileObject;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async write(data) {
        try {
            const stringData = JSON.stringify(data);
            fs.writeFileSync(this.route, stringData);
            return true;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async create(data) {
        try {
            const file = await this.read();
            data.id = getId(file);
            file.push(data);
            await this.write(file);
            return { _id: data.id };
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async getById(id) {
        try {
            const file = await this.read();
            return file.find(item => item.id == id) || { error: 'producto no encontrado' };
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async getAll() {
        try {
            return await this.read();
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async updateById(id, data) {
        try {
            const elements = await this.read();
            const element = elements.find(item => item.id == id);
            const index = elements.indexOf(element);
            elements[index] = { ...element, ...data };
            this.write(elements);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async deleteById(id) {
        try {
            const file = await this.read();
            const newFile = file.filter(item => item.id != id);
            this.write(newFile);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async deleteAll() {
        try {
            await this.write([]);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async updateCartProductsById(id, data) {
        try {
            const elements = await this.read();
            const element = elements.find(item => item.id == id);
            const index = elements.indexOf(element);
            console.log('data', data);
            elements[index] = { ...element, ...data };
            this.write(elements);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async deleteCartProductById(id, productId) {
        try {
            const elements = await this.read();
            const element = elements.find(item => item.id == id);
            const index = elements.indexOf(element);
            const newProducts = element.productos.filter(item => item.id != productId);
            elements[index] = { ...element, productos: newProducts };
            this.write(elements);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

}