import { Request, Response } from "express"
import { UserModel } from "../models/user.model"


export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.userId
        if (!userId) throw new Error()

        const user = await UserModel.findById(userId).select({ password: 0, __v: 0 })
        if (!user) return res.status(404).json({ data: null })

        return res.status(200).json({
            data: user,
            error: null
        })
    } catch (error) {
        return res.status(401).json({
            data: null,
            error: "Unauthorized !"
        })
    }
}

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const data = req.body

        const users = await UserModel.findByIdAndUpdate(req.userId, data)
        return res.status(200).json({
            data: users,
            error: null
        })
    } catch (error) {
        return res.status(404).json({
            data: null,
            error: "An error occurred while update user !"
        })
    }
}