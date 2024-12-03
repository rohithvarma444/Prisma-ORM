import express, { Request, Response, NextFunction } from "express";
import {createItem,getItems,getItemById,deleteItem} from '../constrollers/itemController'

const router = express.Router();


router.post("/create", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await createItem(req, res);
    } catch (error) {
        next(error);
    }
});

router.get("/items", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await getItems(req, res);
    } catch (error) {
        next(error);
    }
});

router.get("/item/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await getItemById(req, res);
    } catch (error) {
        next(error);
    }
});

router.delete("/item/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await deleteItem(req, res);
    } catch (error) {
        next(error);
    }
});


export default router;