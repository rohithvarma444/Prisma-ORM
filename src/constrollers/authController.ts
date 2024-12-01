import { Request, Response } from 'express'
import prisma from '../prisma'
import { hashPassword,comparePassword,generateToken } from '../utils/authHelper'


export const register = async(req: Request,res: Response): Promise<Response> => {
    
    const { name, firstName, lastName, email,password } = req.body;

    try {
        const userDetails = await prisma.user.findUnique({
            where: { email: email } 
        });

        if (userDetails) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: { name,email,password: hashedPassword}
        })

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

export const signin = async(req: Request, res: Response) => {

    const { email, password } = req.body;

    try {
        const userDetails = await prisma.user.findUnique({
            where: {email}
        });

        if(!userDetails){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const isValid = await comparePassword(password,userDetails.password);
        if(!isValid){
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            })
        }

        const token = await generateToken(userDetails.id);
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}