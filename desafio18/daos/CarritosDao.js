import config from "../config.js";
import { ContenedorMongoDb } from "../contenedores/ContenedorMongoDb.js";
import { carritosModel } from '../models/carritosModel.js';

export const CarritosDaoMongoDb = new ContenedorMongoDb(config.mongoDb, carritosModel, 'carritos');