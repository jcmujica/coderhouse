const handlebars = require('express-handlebars');
const path = require('path');

const handlebarsInit = handlebars.create({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, `../../views/hbs`)
});

module.exports = handlebarsInit;