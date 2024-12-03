import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();
const SECRET: string = process.env.JWT_SECRET || "secret";

export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password,10);
}

export const comparePassword = async(password: string,hashedPassword: string): Promise<boolean> =>{
    return bcrypt.compare(password,hashedPassword);
}

export const generateToken = (id: string): string => {
    return jwt.sign({ id }, SECRET, { expiresIn: "1h" });
};
