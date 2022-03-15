import config from "../../config.js";
import { ContenedorArchivo } from "../../contenedores/ContenedorArchivo.js";

export const ProductosDaoArchivo = new ContenedorArchivo(config.fs, 'productos');