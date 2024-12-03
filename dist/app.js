"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const itemRoutes_1 = __importDefault(require("./routes/itemRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
const PORT = Number(process.env.PORT) || 5000;
const hello = (req, res) => {
    res.send('Hello, the server is running!');
};
app.use(express_1.default.json());
app.get('/', hello);
app.use('/auth', authRoutes_1.default);
app.use('/crud', itemRoutes_1.default);
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
