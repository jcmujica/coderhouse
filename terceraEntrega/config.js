import { config } from 'dotenv';
import MongoStore from 'connect-mongo';
config();
const mongoConfig = {
    cnxStr: process.env.MONGO_URL,
    params: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
};

export default {
    PORT: process.env.PORT || 8080,
    mongoDb: {
        ...mongoConfig
    },
    session: {
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: mongoConfig.cnxStr,
            autoReconnect: true,
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        }),
        cookie: {
            maxAge: 1000 * 60 * 10
        }
    },
    emailer: {
        config: {
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.SENDER_EMAIL_PASSWORD
            }
        },
        options: {
            from: 'Servidor Node.js',
            to: process.env.RECIPIENT_EMAIL,
            subject: 'Mail de prueba desde Node.js',
            html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>'
        }
    }
};