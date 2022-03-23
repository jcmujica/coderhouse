const util = require('util');
const { schema, normalize } = require('normalizr');

const normalizeMessages = (messages) => {
    const chat = { id: 'messages', messages };
    const authorSchema = new schema.Entity('authors', {}, { idAttribute: 'email' });
    const textSchema = new schema.Entity('messages')
    const chatSchema = new schema.Entity('chat', {
        text: textSchema,
        author: authorSchema
    })
    const normalizedMessages = normalize(chat, chatSchema);
    return normalizedMessages;
};

module.exports = normalizeMessages;