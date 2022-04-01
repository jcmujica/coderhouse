const { options } = require('./config');
const knex = require('knex')(options);

knex.schema.createTable('productos', table => {
    table.increments('id');
    table.string('name');
    table.integer('price');
    table.string('thumbnail');
    table.string('description');
    table.integer('stock');
    table.string('sku');
    table.timestamps(true, true);
}).then(() => {
    console.log('Productos iniciales creados');
}).catch(err => {
    console.log(err);
}).finally(() => {
    knex.destroy();
});