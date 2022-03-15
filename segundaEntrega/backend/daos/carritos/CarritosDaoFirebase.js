import config from "../../config.js";
import { ContenedorFirebase } from "../../contenedores/ContenedorFirebase.js";

export const ProductosDaoFirebase = new ContenedorFirebase(config.firebase, 'productos');