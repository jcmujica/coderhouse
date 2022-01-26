# Desafio 6
## Consignas
1. Utilizando la misma API de productos del proyecto entregable de la clase anterior, construir un web server (no REST) que incorpore:
    1. Un formulario de carga de productos en la ruta raíz (configurar la ruta '/productos' para recibir el POST, y redirigir al mismo formulario).
    2. Una vista de los productos cargados (utilizando plantillas de handlebars) en la ruta GET '/productos'.
    3. Ambas páginas contarán con un botón que redirija a la otra.
2. Manteniendo la misma funcionalidad reemplazar el motor de plantillas handlebars por pug.
3. Manteniendo la misma funcionalidad reemplazar el motor de plantillas handlebars por ejs.
4. Por escrito, indicar cuál de los tres motores de plantillas prefieres para tu proyecto y por qué.

## Aspectos a incluir en el entregable:
Realizar las plantillas correspondientes que permitan recorrer el array de productos y representarlo en forma de tabla dinámica, siendo sus cabeceras el nombre de producto, el precio y su foto (la foto se mostrará como un imágen en la tabla)
En el caso de no encontrarse datos, mostrar el mensaje: 'No hay productos'.

## Sugerencias:
Utilizar iconfinder (https://www.iconfinder.com/free_icons) para obtener la url de las imágenes de los productos (click derecho sobre la imagen -> copiar dirección de la imagen)

## Opcional:
Utilizar bootstrap para maquetar la vista creada por dicho motor de plantillas y el formulario de ingreso de productos.

## Resolucion:

```
Productos iniciales:
[
    {
        "id": 1,
        "name": "The Shawshank Redemption",
        "price": "8.99",
        "thumbnail": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg"
    },
    {
        "id": 2,
        "name": "The Godfather",
        "price": "5.99",
        "thumbnail": "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY268_CR3,0,182,268_AL_.jpg"
    },
    {
        "id": 3,
        "name": "The Dark Knight",
        "price": "9.99",
        "thumbnail": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UY268_CR3,0,182,268_AL_.jpg"
    }
]
```