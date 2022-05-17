import fs from 'fs';

const getId = (file) => {
    return file && file.length ? file[file.length - 1].id + 1 : 1;
};

export class ContenedorArchivo {
    constructor(config, name) {
        this.name = name;
        this.route = config.path + name + config.type;
    }

    async read() {
        try {
            const file = await fs.readFileSync(this.route, 'utf8');
            const fileObject = JSON.parse(file);
            return fileObject;
        } catch (e) {
            logger.error(e);
            return null;
        }
    }

    async write(data) {
        try {
            const stringData = JSON.stringify(data);
            fs.writeFileSync(this.route, stringData);
            return true;
        } catch (e) {
            logger.error(e);
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
            logger.error(e);
            return null;
        }
    }

    async getById(id) {
        try {
            const file = await this.read();
            return file.find(item => item.id === parseInt(id)) || { error: 'producto no encontrado' };
        } catch (e) {
            logger.error(e);
            return null;
        }
    }

    async getAll() {
        try {
            return await this.read();
        } catch (e) {
            logger.error(e);
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
            logger.error(e);
            return null;
        }
    }

    async deleteById(id) {
        try {
            const file = await this.read();
            const newFile = file.filter(item => item.id != id);
            this.write(newFile);
        } catch (e) {
            logger.error(e);
            return null;
        }
    }

    async deleteAll() {
        try {
            await this.write([]);
        } catch (e) {
            logger.error(e);
            return null;
        }
    }

    async cartUpdateProductById(id, data) {
        try {
            const carts = await this.read();
            const cart = carts.find(item => item.id == id);
            const index = carts.indexOf(cart);

            const hasProduct = cart.products.find(item => item.id == data.id);

            if (hasProduct) {
                const productIndex = cart.products.indexOf(hasProduct);
                cart.products[productIndex] = { ...hasProduct, ...data };
            } else {
                cart.products.push(data);
            }

            let updatedCarts = [...carts];
            updatedCarts[index] = cart;

            this.write(updatedCarts);
        } catch (e) {
            logger.error(e);
            return null;
        }
    }

    async cartDeleteProductById(id, productId) {
        try {
            const carts = await this.read();
            const cart = carts.find(item => item.id == id);
            const index = carts.indexOf(cart);
            const newProducts = cart.products.filter(item => item.id != productId);
            carts[index] = { ...cart, products: newProducts };
            this.write(carts);
        } catch (e) {
            logger.error(e);
            return null;
        }
    }

}