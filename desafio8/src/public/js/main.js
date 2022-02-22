const socket = io.connect();
let products = [];
let messages = [];

const initialize = async () => {
    console.log('TRY THIS')
    const renderTemplate = async () => {
        const rawTemplate = await fetch('home.hbs');
        const template = await rawTemplate.text();
        const templateFunction = Handlebars.compile(template);
        const body = document.querySelector('body');
        body.innerHTML = templateFunction({ products: products, messages: messages });
        const submitMessageButton = document.getElementById('submitMessageButton');
        submitMessageButton.addEventListener('click', submitMessage);
    };


    socket.on('listProducts', (prods) => {
        console.log('HERE', prods);
        products = prods;
        renderTemplate();
    });

    socket.on('listMessages', (msgs) => {
        messages = msgs;
        renderTemplate();
    });
};

const submitProduct = () => {
    const productName = document.getElementById('name').value;
    const productPrice = document.getElementById('price').value;
    const productImage = document.getElementById('image').value;
    const product = {
        name: productName,
        price: productPrice,
        thumbnail: productImage
    };

    socket.emit('submitProduct', product);
    return false;
}

const submitMessage = (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const messageText = document.getElementById('message').value;
    const date = new Date().toLocaleString('en-GB');
    const message = { email, message: messageText, date };
    if (!email || !messageText) return;

    socket.emit('submitMessage', message);
};

initialize();