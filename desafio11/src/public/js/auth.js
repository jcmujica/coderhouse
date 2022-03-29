const register = async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = {
        username: username,
        password: password,
    };
    await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

};

const login = async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = {
        username: username,
        password: password,
    };
    await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
};

const renderTemplate = async () => {
    const rawTemplate = await fetch('register.hbs');
    const template = await rawTemplate.text();
    const templateFunction = Handlebars.compile(template);
    const body = document.querySelector('body');
    body.innerHTML = templateFunction();

    const registerButton = document.getElementById("register");
    registerButton?.addEventListener("click", register);

    const loginButton = document.getElementById("login");
    loginButton?.addEventListener("click", login);
};

renderTemplate();