import bcrypt from "bcrypt";

const SALT_ROUND = 12;

export async function hashPassword(password: string) {
    return bcrypt.hash(password, SALT_ROUND);
}

export const comparePassword = async (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
}