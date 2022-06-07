import { createTransport } from 'nodemailer';
import config from '../config.js';

export const transporter = createTransport(config.emailer.config);
