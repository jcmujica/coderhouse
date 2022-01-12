const productos = [
    { id: 1, nombre: 'Camisa', precio: 50 },
    { id: 2, nombre: 'Pantalon', precio: 60 },
    { id: 3, nombre: 'Zapatos', precio: 70 },
    { id: 4, nombre: 'Gorra', precio: 80 },
    { id: 5, nombre: 'Bolso', precio: 90 },
    { id: 6, nombre: 'Cinturon', precio: 100 },
]

const nombres = productos.map(producto => producto.nombre);
console.log({ nombres: nombres.toString() });

const precioPropmedio = productos.reduce((acumulador, producto) => {
    return acumulador + producto.precio;
}, 0);
console.log({ precioPropmedio: precioPropmedio / productos.length });
const precioTotal = productos.reduce((acumulador, producto) => {
    return acumulador + producto.precio;
}, 0);
console.log({ precioTotal: precioTotal });