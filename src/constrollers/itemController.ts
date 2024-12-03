import { Request, Response } from 'express';
import prisma from '../prisma';
export const createItem = async (req: Request, res: Response) => {
    const { title, description } = req.body;

    try {
        const itemDetails = await prisma.item.create({
            data: { title, description },
        });
        return res.status(200).json({
            success: true,
            message: "Item has been created successfully",
            item: itemDetails, 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false, 
            message: "Server error",
        });
    }
};

export const getItems = async (req: Request, res: Response) => {
    try {
        const itemDetails = await prisma.item.findMany();
        return res.status(200).json({
            success: true, 
            message: "Items fetched successfully",
            items: itemDetails,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

export const getItemById = async (req: Request, res: Response) => {
    const { id } = req.params; 
    try {
        const itemDetails = await prisma.item.findUnique({
            where: { id: parseInt(id) }, 
        });

        if (!itemDetails) {
            return res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Item fetched successfully",
            item: itemDetails,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

export const deleteItem = async (req: Request, res: Response) => {
    const { id } = req.params; 

    try {
        await prisma.item.delete({
            where: { id: parseInt(id) }, 
        });

        return res.status(200).json({
            success: true,
            message: "Item deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


export const updateItem = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description } = req.body; 

    try {
        const updatedItem = await prisma.item.update({
            where: { id: parseInt(id) }, 
            data: { title, description },
        });

        return res.status(200).json({
            success: true,
            message: "Item updated successfully",
            item: updatedItem, 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update item",
        });
    }
};
