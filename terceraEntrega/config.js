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
    USE_CLUSTER: process.env.USE_CLUSTER === 'true',
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
            service: 'gmail',
            port: 587,
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.SENDER_EMAIL_PASSWORD
            }
        },
        options: {
            from: process.env.SENDER_EMAIL,
            to: process.env.RECIPIENT_EMAIL,
            subject: 'Hola!',
            html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>'
        }
    }
};