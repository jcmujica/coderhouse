import config from "../config.js";
import { ContenedorUsuarios } from "../contenedores/ContenedorUsuarios.js";
import { usuariosModel } from '../models/usuariosModel.js';

export const UsuariosDao = new ContenedorUsuarios(config.mongoDb, usuariosModel, 'usuarios');