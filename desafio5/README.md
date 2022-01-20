-GET '/api/productos' -> devuelve todos los productos.
-GET '/api/productos/:id' -> devuelve un producto según su id.
-POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
-PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
-DELETE '/api/productos/:id' -> elimina un producto según su id.

-Para el caso de que un producto no exista, se devolverá el objeto:
{ error : 'producto no encontrado' }
-Implementar la API en una clase separada, utilizando un array como soporte de persistencia en memoria.
-Incorporar el Router de express en la url base '/api/productos' y configurar todas las subrutas en base a este.
-Crear un espacio público de servidor que contenga un documento index.html con un formulario de ingreso de productos con los datos apropiados.
-El servidor debe estar basado en express y debe implementar los mensajes de conexión al puerto 8080 y en caso de error, representar la descripción del mismo.
-Las respuestas del servidor serán en formato JSON. La funcionalidad será probada a través de Postman y del formulario de ingreso.


Initial products:

```
[
    {
        "id": 1,
        "title": "The Shawshank Redemption",
        "price": "9.99",
        "thumbnail": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg"
    },
    {
        "id": 2,
        "title": "The Godfather",
        "price": "9.99",
        "thumbnail": "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY268_CR3,0,182,268_AL_.jpg"
    },
    {
        "id": 3,
        "title": "The Dark Knight",
        "price": "9.99",
        "thumbnail": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UY268_CR3,0,182,268_AL_.jpg"
    }
]
```