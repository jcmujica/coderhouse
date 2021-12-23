class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(mascota) {
        const currentMascotas = this.mascotas || [];
        this.mascotas = [...currentMascotas, mascota];
    }

    countMasctotas() {
        return this.mascotas.length;
    }

    addBook(nombre, autor) {
        const libro = { nombre, autor };
        const currentLibros = this.libros || [];
        this.libros = [...currentLibros, libro];
    }

    getBookNames() {
        return this.libros.map(libro => libro.nombre);
    }
}


const userData = {
    nombre: 'Chad',
    apellido: 'Ochosiete',
    libros: [
        { nombre: 'La Odisea', autor: 'Homero' },
        { nombre: 'El Principito', autor: 'Antoine de Saint-Exupery' }
    ],
    mascotas: ['Lola', 'Kusa']
}

const usuario = new Usuario(userData.nombre, userData.apellido, userData.libros, userData.mascotas)
const fullName = usuario.getFullName()
const newMascotas = usuario.addMascota('Morcilla')
const mascotasCount = usuario.countMasctotas()
const newBook = usuario.addBook('El Quijote', 'Cervantes')
const bookNames = usuario.getBookNames()

console.log('Usuario: ', usuario)
console.log('Full name: ', fullName)
console.log('Mascotas: ', usuario.mascotas)
console.log('Mascotas count: ', mascotasCount)
console.log('New book: ', usuario.libros)
console.log('Book names: ', bookNames)