import { promises as fs } from "fs";

export class ContenedorArchivo {
    constructor(path) {
        this.path = path;
    }

    async read(id) {
        try {
            const list = this.listAll();
            return list.find(el => el.id === id);
        } catch (error) {
            console.log(error);
            return {};
        }
    }

    async listAll() {
        try {
            const files = await fs.readFile(this.path);
            return JSON.parse(files);
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}