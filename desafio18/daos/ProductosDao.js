import config from "../config.js";
import { ContenedorMongoDb } from "../contenedores/ContenedorMongoDb.js";
import { productosModel } from '../models/productosModel.js';

export const ProductosDaoMongoDb = new ContenedorMongoDb(config.mongoDb, productosModel, 'productos');