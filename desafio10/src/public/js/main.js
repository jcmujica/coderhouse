const socket = io.connect();
let products = [];
let messages = [];

const initialize = async () => {
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
        products = prods;
        renderTemplate();
    });

    socket.on('listMessages', (msgs) => {
        messages = msgs;
        console.log(messages);
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
    const text = document.getElementById('message').value;
    const name = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const age = document.getElementById('age').value;
    const alias = document.getElementById('alias').value;
    const avatar = document.getElementById('avatar').value;
    const date = new Date().toLocaleString('en-GB');
    const error = document.getElementById('error');
    const message = {
        author: {
            email: email,
            name: name,
            lastName: lastName,
            age: age,
            alias: alias,
            avatar: avatar,
            date: date
        },
        text: text
    };

    if (!email || !text || !name || !lastName || !age || !alias || !avatar) {
        error.classList.remove('hidden');
        return
    } else {
        error.classList.add('hidden');
    }

    socket.emit('submitMessage', message);
};

initialize();