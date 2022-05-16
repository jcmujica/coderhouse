import config from "../config.js";
import { ContenedorMongoDb } from "../contenedores/ContenedorMongoDb.js";
import { usuariosModel } from '../models/usuariosModel.js';

export const UsuariosDao = new ContenedorMongoDb(config.mongoDb, usuariosModel, 'usuarios');