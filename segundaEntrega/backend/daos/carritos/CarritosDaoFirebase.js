import config from "../../config.js";
import { ContenedorFirebase } from "../../contenedores/ContenedorFirebase.js";

export const CarritosDaoFirebase = new ContenedorFirebase(config.firebase, 'carritos');