import config from "../../config";
import { ContenedorFirebase } from "../../contenedores/ContenedorFirebase";

const productosApi = new ContenedorFirebase(config.firebase, 'productos');

export default productosApi;