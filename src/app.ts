import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import prisma from './prisma'
import authRoutes from "./routes/authRoutes"
import itemRoutes from "./routes/itemRoutes"

dotenv.config();

const app = express();
app.use(express.urlencoded({extended: false}))
app.use(express.json())
const PORT: number = Number(process.env.PORT) || 5000;

const hello = (req: Request, res: Response) => {
    res.send('Hello, the server is running!');
};

app.use(express.json());
app.get('/', hello);
app.use('/auth',authRoutes)
app.use('/crud',itemRoutes)


app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
});


