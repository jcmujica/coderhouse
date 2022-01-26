const handlebars = require('../engines/handlebars');
const pug = require('pug');
const ejs = require('ejs');

const getSelectedEngine = (viewEngine) => {
    let engine = null;
    if (viewEngine === 'pug') {
        engine = pug;
    } else if (viewEngine === 'ejs') {
        engine = ejs;
    } else {
        engine = handlebars.engine;
    }
    console.log('engine', engine);
    return engine;
};

module.exports = {
    getSelectedEngine,
};