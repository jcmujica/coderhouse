import twilio from 'twilio';
import config from '../config.js';
import { logger } from './logger.js';

const client = twilio(config.TWILIO_SID, config.TWILIO_AUTH_TOKEN)

export const sendMessage = async ({ to, body }) => {
    try {
        if (!to || !body) return null;
        await client.messages.create({
            body: body,
            from: config.TWILIO_FROM,
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