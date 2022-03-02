# Consigna:
Utilizando Mongo Shell, crear una base de datos llamada ecommerce que contenga dos colecciones: mensajes y productos.

## Agregar 10 documentos con valores distintos a las colecciones mensajes y productos. El formato de los documentos debe estar en correspondencia con el que venimos utilizando en el entregable con base de datos MariaDB.

## Definir las claves de los documentos en relación a los campos de las tablas de esa base. En el caso de los productos, poner valores al campo precio entre los 100 y 5000 pesos(eligiendo valores intermedios, ej: 120, 580, 900, 1280, 1700, 2300, 2860, 3350, 4320, 4990).

- Abrir 2 terminales, en una ejecutar `mongod --dbpath [ruta a la carpeta db]` en la otra abrir el shell de mongo ejecutando `mongo`
- En adelante los comandos se ejecutaran en el terminal donde se ejecuto el comando `mongo`
- Ejecutar `use ecommerce`
- Cambiamos a la db ecommerce
- Ahora estamos en la base de datos `ecommerce`
- Ejecutar el comando `db.productos.insert([contenido del archivo data/productos])`
- Productos insertados
- Ejecutar el comando `db.mensajes.insert([contenido del archivo data/mensajes])`
- Mensajes insertados

## Listar todos los documentos en cada colección.

- Listar productos usando `db.productos.find({})`
- Listar mensajes usando `db.mensajes.find({})`

## Mostrar la cantidad de documentos almacenados en cada una de ellas.

- Contar productos usando `db.productos.countDocuments({})`
- Contar mensajes usando `db.mensajes.countDocuments({})`
## Realizar un CRUD sobre la colección de productos:

### Agregar un producto más en la colección de productos

Producto:
```
    {
        "name": "Back to the Future II",
        "price": 3500,
        "thumbnail": "https://images-na.ssl-images-amazon.com/images/I/513GDptt9HL._SX315_BO1,204,203,200_.jpg",
        "description": "Back to the Future II",
        "sku": "ABC132",
        "stock": 45
    }
```
- Insertar el producto anterior usando `db.productos.insertOne([producto])

### Realizar una consulta por nombre de producto específico:

- Encontrar el producto por nombre usando `db.productos.find({"name": "Back to the Future II"})`

### Listar los productos con precio menor a 1000 pesos.

- Encontrar productos con precio menor a 1000 usando `db.productos.find({"price": {$lt: 1000}})`

### Listar los productos con precio entre los 1000 a 3000 pesos.

- Encontrar productos en ese rango usando `db.productos.find({"price": {$in: [1000, 3000]}})`

### Listar los productos con precio mayor a 3000 pesos.

- Encontrar productos con precio mayor a 3000 usando `db.productos.find({"price": {$gt: 3000}})`

### Realizar una consulta que traiga sólo el nombre del tercer producto más barato.

- Encontrar este producto usando `db.productos.find({}, {"name": 1, _id: 0}).sort({"price": 1}).skip(2).limit(1)`

### Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.

- Actualizar productos usando `db.productos.updateMany({}, {$set: { "stock": 100 }})`

### Cambiar el stock a cero de los productos con precios mayores a 4000 pesos.

- Actualizar productos usando `db.productos.updateMany({"price": {$gt: 4000}}, {$set: { "stock": 0 }})`
### Borrar los productos con precio menor a 1000 pesos

- Borrar los documentos usando `db.productos.deleteMany({ "price": {$lt: 1000}})`

## Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce. Verificar que pepe no pueda cambiar la información.
