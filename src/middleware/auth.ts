import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

interface AuthenticatedRequest extends Request {
    user?: string | jwt.JwtPayload; 
}

export const auth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "You are not authenticated to use this app",
            });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);

        req.user = decodedToken;
        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({
            success: false,
            message: "Invalid token or unauthorized access",
        });
    }
};
