import jwt from "jsonwebtoken"
import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt"
import { generateTokens } from "../utils/jwt.util";

interface LoginData {
    username: string
    password: string
}


export const login = async (req: Request, res: Response) => {
    try {  
        const data: LoginData = req.body
        //checking password
        const user = await UserModel.findOne({ username: data.username })
        if (!user) throw Error("User isn't exist !")

        const isValid = await bcrypt.compare(data.password, user.password)
        if (!isValid) throw Error("Username or password is not correct !")

        //if the user valid, generate tokens
        const { _id, username } = user
        const { accessToken, refreshToken } = generateTokens({ _id, username })

        return res.status(200).json({
            accessToken,
            refreshToken
        })

    } catch (error) {
        console.log(error);
        
        return res.status(401).json({
            data: null,
            error: "Unauthorized"
        })
    }
}

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const extractedToken = req.query['token'] as string
        if (!extractedToken) return res.sendStatus(401)

        const jwtSecret = process.env.JWT_SECRET as string
        const isValid: any = jwt.verify(extractedToken, jwtSecret)
        if (!isValid) return res.sendStatus(403)

        const { accessToken } = generateTokens({ _id: isValid._id, username: isValid.username })

        return res.status(200).json({
            accessToken
        })

    } catch (error) {
        return res.status(403).json({
            data: null,
            error: "Request failed !"
        })
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        const data = req.body

        if (!data) throw new Error()

        // Check account existing
        const isExist = await UserModel.findOne({ username: data.username })
        if (isExist) throw new Error("User already exist !")

        //Hasing password
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt)

        const newUser = await UserModel.create({
            ...data,
            password: hashedPassword
        })
        const savedUser = await newUser.save()

        return res.status(201).json({
            data: savedUser,
            error: null
        })
    } catch (error) {
        return res.status(400).json({
            data: null,
            error
        })
    }
}