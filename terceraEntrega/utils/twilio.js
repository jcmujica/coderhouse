import twilio from 'twilio';

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_FROM;

const client = twilio(accountSid, authToken)

export const sendMessage = async ({to, body}) => {
    try {
        if (!to || !body) return null;
        const message = await client.messages.create({
            body: body,
            from: from,
            to: to
        });
        console.log(message)
    } catch (error) {
        console.log(error)
    }
};

const twilioService = {
    sendMessage
};

export default twilioService;