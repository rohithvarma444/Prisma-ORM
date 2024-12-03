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
const express_1 = __importDefault(require("express"));
const itemController_1 = require("../constrollers/itemController");
const router = express_1.default.Router();
router.post("/create", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, itemController_1.createItem)(req, res);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/items", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, itemController_1.getItems)(req, res);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/item/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, itemController_1.getItemById)(req, res);
    }
    catch (error) {
        next(error);
    }
}));
router.delete("/item/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, itemController_1.deleteItem)(req, res);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
