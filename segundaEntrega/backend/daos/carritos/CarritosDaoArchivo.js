import config from "../../config.js";
import { ContenedorArchivo } from "../../contenedores/ContenedorArchivo.js";

export const CarritosDaoArchivo = new ContenedorArchivo(config.fs, 'carritos');