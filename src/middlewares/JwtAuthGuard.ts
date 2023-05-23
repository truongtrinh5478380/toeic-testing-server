import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export function AuthGuard(req: Request, res: Response, next: NextFunction) {
	try {
		const jwtSecret = process.env.JWT_SECRET as string

		const authHeader = req.header('Authorization')
		const token = authHeader && authHeader.split(' ')[1]

		if (!token) return res.sendStatus(401)

		const decoded: any = jwt.verify(token, jwtSecret)

		req.userId = decoded._id
		
		next()
	} catch (error) {

		return res.sendStatus(403)
	}
}