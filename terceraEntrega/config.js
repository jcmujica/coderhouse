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
    }
};