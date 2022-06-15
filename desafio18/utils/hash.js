import bcrypt from "bcrypt";
const saltRounds = 10;

export const hashPassword = async (password) => {
    let hash = await bcrypt.hash(password, saltRounds);
    return hash;
};

export const comparePassword = async (password, hash) => {
    let isValid = await bcrypt.compare(password, hash);
    return isValid;
};