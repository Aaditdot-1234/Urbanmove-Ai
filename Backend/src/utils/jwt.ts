import jwt, { JwtPayload as BaseJwtPayload } from "jsonwebtoken";

if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not set");
const JWT_SECRET = process.env.JWT_SECRET;

if (!process.env.JWT_REFRESH_SECRET) throw new Error("JWT_REFRESH_SECRET is not set");
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const JWT_EXPIRY = '1h';
const JWT_REFRESH_EXPIRY = '30d';

export type JwtPayload = BaseJwtPayload & {
    sub: string,
    email: string
}

export const generateToken = (payload: Omit<JwtPayload, 'iat' | 'exp'>) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
}

export const generateRefreshToken = (payload: Omit<JwtPayload, 'iat' | 'exp'>) => {
    return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRY });
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
}

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, JWT_REFRESH_SECRET) as JwtPayload;
}

export const decodeToken = (token: string) => {
    return jwt.decode(token) as JwtPayload;
}