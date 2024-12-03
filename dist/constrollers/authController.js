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
exports.signin = exports.register = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const authHelper_1 = require("../utils/authHelper");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, firstName, lastName, email, password } = req.body;
    console.log(name, " ", email, " ", password);
    try {
        const userDetails = yield prisma_1.default.user.findUnique({
            where: { email }
        });
        if (userDetails) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
        const hashedPassword = yield (0, authHelper_1.hashPassword)(password);
        const user = yield prisma_1.default.user.create({
            data: { name, email, password: hashedPassword }
        });
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
});
exports.register = register;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const userDetails = yield prisma_1.default.user.findUnique({
            where: { email }
        });
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const isValid = yield (0, authHelper_1.comparePassword)(password, userDetails.password);
        if (!isValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });
        }
        const token = yield (0, authHelper_1.generateToken)(userDetails.id.toString());
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});
exports.signin = signin;
