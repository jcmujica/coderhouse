const { options } = require('./config');
const knex = require('knex')(options);

const products = [
    {
        "id": 1,
        "name": "The Shawshank Redemption",
        "price": "8.99",
        "thumbnail": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
        "description": "Two imprisoned",
        "sku": "ABC123",
        "stock": 10
    },
    {
        "id": 2,
        "name": "The Godfather",
        "price": "5.88",
        "thumbnail": "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY268_CR3,0,182,268_AL_.jpg",
        "description": "The aging patriarch",
        "sku": "ABC124",
        "stock": "555"
    },
    {
        "id": 3,
        "name": "The Dark Knight",
        "price": "9.99",
        "thumbnail": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UY268_CR3,0,182,268_AL_.jpg",
        "description": "The Joker",
        "sku": "ABC125",
        "stock": 13
    }
];

knex('productos').insert(products).then(() => {
    console.log('Tabla productos creada');
}).catch(err => {
    console.log(err);
}).finally(() => {
    knex.destroy();
});