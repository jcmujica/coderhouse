const util = require('util');
const { schema, normalize } = require('normalizr');

const normalizeMessages = (messages) => {
    const newMessages = { id: 'mensajes', messages };
    const authorSchema = new schema.Entity('authors', {
        author: [messages]
    });
    const textSchema = new schema.Entity('messages');
    const chatSchema = new schema.Entity('chat', {
        author: authorSchema,
        text: [textSchema]
    });
    const normalizedMessages = normalize(newMessages, chatSchema);


    console.log(util.inspect(normalizedMessages, true, 7, true));
};

module.exports = normalizeMessages;