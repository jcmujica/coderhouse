import admin from "firebase-admin";
import { serviceAccount } from "./config.js";

export const initFirebase = () => admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
