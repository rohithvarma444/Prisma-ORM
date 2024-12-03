import express, { Request, Response, NextFunction } from "express";
import { register, signin } from "../constrollers/authController";

const router = express.Router();

router.post("/register", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await register(req, res);
    } catch (error) {
        next(error);
    }
});

router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await signin(req, res);
    } catch (error) {
        next(error);
    }
});

export default router;
