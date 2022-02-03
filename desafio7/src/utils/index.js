const fs = require('fs');

const restoreProducts = () => {
    try {
        fs.writeFileSync('src/productos.txt', fs.readFileSync('src/productos.example.txt'));
        return true;
    } catch (e) {
        console.log(e);
        return null;
    }
};

module.exports = {
    restoreProducts,
};