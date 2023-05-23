import { Request, Response } from "express"
import { UserModel } from "../models/user.model"
import { TopicModel } from "../models/topic.model"
import { ResultModel } from "../models/result.model"
import { toeicScoreConverter } from "../utils/toeic-band.util"

interface TopicSubmitDTO {
	topicId: string
	listening: number
	reading: number
}

export const submitResult = async (req: Request, res: Response) => {
	try {
		const userId = req.userId
		const sumbitBody: TopicSubmitDTO = req.body
		if (!userId) return res.sendStatus(401)

		const topic = await TopicModel.findById(sumbitBody.topicId)
		if (!topic) return res.sendStatus(404)

		const listeningPoint = toeicScoreConverter(sumbitBody.listening, 'listening')
		const readingPoint = toeicScoreConverter(sumbitBody.reading, 'reading')

		const result = await ResultModel.findOneAndUpdate(
			{ topic: sumbitBody.topicId, user: userId },
			{ user: userId, topic: sumbitBody.topicId, point: listeningPoint + readingPoint },
			{ upsert: true, new: true })

		return res.status(200).json({
			data: result,
			error: null
		})
	} catch (error) {
		return res.status(400).json({
			data: null,
			error: "Bad submit request !"
		})
	}
}

export const getUserResult = async (req: Request, res: Response) => {
	try {
		const userId = req.userId
		if (!userId) return res.sendStatus(401)

		const results = await ResultModel.find({ user: userId }).populate(['topic'])
		return res.status(200).json({
			data: results,
			error: null
		})

	} catch (error) {
		return res.status(404).json({
			data: null,
			error: "Cannot find any record !"
		})
	}
}

export const getRanking = async (req: Request, res: Response) => {
	try {
		const ranking = await ResultModel.aggregate([
			{
				$group: {
					_id: "$user",
					totalPoints: { $sum: "$point" }
				}
			},
			{
				$sort: { totalPoints: -1 }
			},
			{
				$lookup: {
					from: "users", // Assuming the collection name is "users"
					localField: "_id",
					foreignField: "_id",
					as: "user"
				}
			}
		])
		return res.status(200).json({
			data: ranking,
			error: null
		})

	} catch (error) {
		return res.status(404).json({
			data: null,
			error: "Cannot find any record !"
		})
	}
}