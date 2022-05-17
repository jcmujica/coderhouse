import twilio from 'twilio';

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_FROM;

const client = twilio(accountSid, authToken)

export const sendMessage = async ({ to, body }) => {
    try {
        if (!to || !body) return null;
        await client.messages.create({
            body: body,
            from: from,
            to: to
        });
    } catch (e) {
        logger.error(e)
    }
};

const twilioService = {
    sendMessage
};

export default twilioService;