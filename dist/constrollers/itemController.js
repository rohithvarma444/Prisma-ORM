"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItem = exports.deleteItem = exports.getItemById = exports.getItems = exports.createItem = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    try {
        const itemDetails = yield prisma_1.default.item.create({
            data: { title, description },
        });
        return res.status(200).json({
            success: true,
            message: "Item has been created successfully",
            item: itemDetails,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});
exports.createItem = createItem;
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemDetails = yield prisma_1.default.item.findMany();
        return res.status(200).json({
            success: true,
            message: "Items fetched successfully",
            items: itemDetails,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});
exports.getItems = getItems;
const getItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const itemDetails = yield prisma_1.default.item.findUnique({
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});
exports.getItemById = getItemById;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma_1.default.item.delete({
            where: { id: parseInt(id) },
        });
        return res.status(200).json({
            success: true,
            message: "Item deleted successfully",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});
exports.deleteItem = deleteItem;
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const updatedItem = yield prisma_1.default.item.update({
            where: { id: parseInt(id) },
            data: { title, description },
        });
        return res.status(200).json({
            success: true,
            message: "Item updated successfully",
            item: updatedItem,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update item",
        });
    }
});
exports.updateItem = updateItem;
