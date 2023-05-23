import { NextFunction, Request, Response } from "express"
import { Roles, UserModel } from "../models/user.model"

export async function RoleGuard(req: Request, res: Response, next: NextFunction) {
	try {
		const userId = req.userId

        const user = await UserModel.findById(userId)
        if(user?.role === Roles.Teacher)
		    return next()
        
        throw new Error('Not allowed')
	} catch (error) {
		return res.sendStatus(403)
	}
}