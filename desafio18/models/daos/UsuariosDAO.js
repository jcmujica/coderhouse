import GenericDAO from "./GenericDAO.js";
import { usuariosModel } from "../usuariosModel.js";

export default class UsuariosDAO extends GenericDAO {
    constructor() {
        super(usuariosModel, "usuarios");
    }

    async findByUsername(username) {
        try {
            const user = await this.model.findOne({ username: `${username}` });
            return user;
        } catch (e) {
            logger.error(e);
            return { error: "error in findByUsername" };
        }
    }

    async findOrCreate(data) {
        try {
            const user = await this.model.findOne({ username: `${data.username}` });
            if (user) {
                return { error: "user already exists" };
            } else {
                const { password } = data;
                const encryptedPassword = await bcrypt.hash(password, saltRounds);
                let item = await this.model.create({ ...data, password: encryptedPassword });
                if (item._doc) {
                    return { ...item._doc };
                } else {
                    return { error: "error in registry" };
                }
            }
        } catch (e) {
            logger.error(e);
            return { error: "error in findOrCreate" };
        }
    }
}