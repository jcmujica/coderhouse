import admin from "firebase-admin";

export const initFirebase = () => admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export class ContenedorFirebase {
    constructor(config, name) {
        this.name = name;
        this.firebase = admin.initializeApp({
            credential: admin.credential.cert(config)
        });
    }

    read() {
        try {

        } catch (e) {
            console.log(e);
            return null;
        }
    }

    write(data) {
        try {

        } catch (e) {
            console.log(e);
            return null;
        }
    }

    save(data) {
        try {

        } catch (e) {
            console.log(e);
            return null;
        }
    }

    getById(id) {
        try {

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
        try {

        } catch (e) {
            console.log(e);
            return null;
        }
    }

    deleteById(id) {
        try {

        } catch (e) {
            console.log(e);
            return null;
        }
    }

    deleteAll() {
        try {

        } catch (e) {
            console.log(e);
            return null;
        }
    }

};