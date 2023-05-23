import { Request, Response } from "express"
import { ExerciseModel } from "../models/exercise.model"
import { QuestionDocument, QuestionModel } from "../models/question.model";


export const createExercise = async (req: Request, res: Response) => {
	try {
		const data = req.body

		// Map the DTO questions to Question documents
		const questionDocuments = await Promise.all(data.questions.map(async (question: QuestionDocument) => {
			const newQuestion = new QuestionModel(question)
			await newQuestion.save()
			return newQuestion

		}));

		const newExercise = await ExerciseModel.create({
			...data,
			questions: questionDocuments,
			createdAt: new Date()
		})

		const saved = await newExercise.save()

		return res.status(200).json({
			data: saved,
			error: null
		})
	} catch (error) {
		return res.status(400).json({
			data: null,
			error: "Bad information !"
		})
	}
}

export const getExercises = async (req: Request, res: Response) => {
	try {
		const exercises = await ExerciseModel.find({ isTopicComponent: false }).populate(['questions'])
		return res.status(200).json({
			data: exercises,
			error: null
		})
	} catch (error) {
		return res.status(404).json({
			data: null,
			error: "Not found !"
		})
	}
}

export const getExerciseById = async (req: Request, res: Response) => {
	try {
		const id = req.params['id']
		const exercises = await ExerciseModel.findById({ _id: id }).populate(['questions'])
		return res.status(200).json({
			data: exercises,
			error: null
		})
	} catch (error) {
		return res.status(404).json({
			data: null,
			error: "Not found !"
		})
	}
}

export const getExercisesByCategory = async (req: Request, res: Response) => {
	try {
		const category = req.query['category']
		const exercises = await ExerciseModel.find({ questionCategory: category, isTopicComponent: false }).populate(['questions'])
		return res.status(200).json({
			data: exercises,
			error: null
		})
	} catch (error) {
		return res.status(404).json({
			data: null,
			error: "Not found !"
		})
	}
}

export const deleteExercise = async (req: Request, res: Response) => {
	try {
		const exerciseId = req.params['id']
		const exercises = await ExerciseModel.findByIdAndDelete(exerciseId)
		return res.status(202).json({
			data: exercises,
			error: null
		})
	} catch (error) {
		return res.status(404).json({
			data: null,
			error: "Not found !"
		})
	}
}