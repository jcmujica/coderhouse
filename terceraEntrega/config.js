import { config } from 'dotenv';
config();

export default {
    PORT: process.env.PORT || 8080,
    mongoDb: {
        cnxStr: process.env.MONGO_URL,
        params: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }
}