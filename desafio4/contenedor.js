const fs = require('fs');

class Contenedor {
    constructor(name) {
        this.name = name;
        this.route = './' + name + '.txt';
    }

    read() {
        try {
            const file = fs.readFileSync(this.route, 'utf8');
            return file;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    write(data) {
        try {
            fs.writeFileSync(this.route, data);
            return true;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    save(data) {
        try {
            const file = this.read();
            const lastId = file.length > 0 ? file[file.length - 1].id : 0;
            data.id = lastId + 1;
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
            const result = file.find(item => item.id === id);
            return JSON.parse(result);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    getAll() {
        try {
            const file = this.read();
            return JSON.parse(file);
        } catch (e) {
            console.log(e);
            return null;
        }
    }


    deleteById(id) {
        try {
            const file = this.read();
            const newFile = file.filter(item => item.id === id);
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