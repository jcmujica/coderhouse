const { options } = require('./config');
const knex = require('knex')(options);

knex.schema.createTable('mensajes', table => {
    table.increments('id');
    table.string('date');
    table.string('email');
    table.string('message');
    table.timestamps(true, true);
}).then(() => {
    console.log('Mensajes iniciales creados');
}).catch(err => {
    console.log(err);
}).finally(() => {
    knex.destroy();
});