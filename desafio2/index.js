const fs = require('fs');

class Contenedor {
    constructor(nombre) {
        this.nombre = nombre;
        this.ruta = `./${nombre}.txt`;
    }

    read() {
        try {
            const file = fs.readFileSync(this.ruta, 'utf8');
            return JSON.parse(file);
        } catch (e) {
            console.log(e)
            return null;
        }
    }

    write(data) {
        try {
            fs.writeFileSync(this.ruta, JSON.stringify(data));
        } catch (e) {
            console.log(e);
        }
    }

    getLastId(file) {
        try {
            if (file && file.length > 0) {
                const lastItemId = file[file.length - 1].id;
                return lastItemId;
            } else {
                return 1;
            }
        } catch (e) {
            console.log(e)
            return null;
        }
    }

    save(data) {
        try {
            let saveData = [];
            let itemId = null;
            const file = this.read(this.ruta)

            if (file) {
                saveData = file;
                itemId = this.getLastId(file) + 1;
                saveData.push({ ...data, id: itemId });
                fs.writeFileSync(this.ruta, JSON.stringify(saveData));
            } else {
                itemId = this.getLastId(file);
                saveData.push({ ...data, id: itemId });
                fs.appendFileSync(this.ruta, JSON.stringify(saveData));
            }

            return itemId;
        } catch (e) {
            console.log(e)
        }
    }

    getById(id) {
        try {
            const file = this.read(this.ruta);
            return file.find(item => item.id === id) ?? 'File not found';
        } catch (e) {
            console.log(e);
        }
    }

    getAll() {
        try {
            return this.read(this.ruta);
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    deleteById(id) {
        try {
            const file = this.read(this.ruta);
            const newFile = file.filter(item => item.id !== id);
            this.write(newFile);

        } catch (e) {
            console.log(e);
        }
    }

    deleteAll() {
        try {
            this.write([]);
        } catch (e) {
            console.log(e);
        }
    }
}

const producto1 = {
    title: 'Escuadra',
    price: 123.45,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
};

const producto2 = {
    title: 'Calculadora',
    price: 234.56,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
}

const producto3 = {
    title: 'Globo Terráqueo',
    price: 345.67,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
}

const productos = new Contenedor('productos');
console.log('Saved product with ID: ', productos.save(producto1))
console.log('Saved product with ID: ', productos.save(producto2))
console.log('Saved product with ID: ', productos.save(producto3))
console.log('Get by ID result: ', productos.getById(2));
console.log('All results: ', productos.getAll());
productos.deleteById(1);
console.log('All results: ', productos.getAll());
productos.deleteAll();
console.log('All results: ', productos.getAll());