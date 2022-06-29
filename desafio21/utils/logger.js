import winston from 'winston';

export const logger = winston.createLogger({
    level: 'warn',
    transports: [
        new winston.transports.Console({ level: 'verbose' }),
        new winston.transports.File({ filename: 'info.log', level: 'error' }),
    ]
})