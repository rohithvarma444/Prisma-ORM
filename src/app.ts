import express from 'express'
import dotenv from 'dotenv'
import prisma from './prisma'
import authRoutes from './constrollers/authController.js';

dotenv.config();

const app = express();
const PORT: number = process.env.PORT | 5000


app.use(express.json());

app.use('/auth',authRoutes)



app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
});


