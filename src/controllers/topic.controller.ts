import { Request, Response } from "express"
import { TopicModel } from "../models/topic.model"
import { QuestionDocument, QuestionModel } from "../models/question.model";
import { ExerciseDocument, ExerciseModel } from "../models/exercise.model";

export const createTopic = async (req: Request, res: Response) => {
    try {
        const data = req.body

        // Map the DTO sections to Section documents
        const sectionDocuments = await Promise.all(data.sections.map(async (section: ExerciseDocument[]) => {
            const exercises = await Promise.all(section.map(async (exerc) => {
                // Map the DTO questions to Question documents
                const questionDocuments = await Promise.all(exerc.questions.map(async (question: QuestionDocument) => {
                    const newQuestion = new QuestionModel(question)
                    await newQuestion.save()
                    return newQuestion
                }));

                const newExercise = new ExerciseModel({
                    ...exerc,
                    questions: questionDocuments
                })

                await newExercise.save()
                return newExercise
            }))

            return exercises
        }));

        const newTopic = await TopicModel.create({
            ...data,
            sections: sectionDocuments,
            createdAt: new Date()
        })

        const saved = await newTopic.save()

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

export const getTopics = async (req: Request, res: Response) => {
    try {
        const topics = await TopicModel.find()

        return res.status(200).json({
            data: topics,
            error: null
        })
    } catch (error) {
        return res.status(404).json({
            data: null,
            error: "Not found !"
        })
    }
}

export const getTopicById = async (req: Request, res: Response) => {
    try {
        const id = req.params['id']
        const topics = await TopicModel
            .findById({ _id: id })
            .populate({
                path: 'sections',
                model: 'Exercises',
                populate: {
                    path: 'questions',
                    model: 'Questions'
                }
            })
        return res.status(200).json({
            data: topics,
            error: null
        })
    } catch (error) {
        return res.status(404).json({
            data: null,
            error: "Not found !"
        })
    }
}

export const deleteTopic = async (req: Request, res: Response) => {
    try {
        const topicId = req.params['id']
        const topics = await TopicModel.findByIdAndDelete(topicId)
        return res.status(202).json({
            data: topics,
            error: null
        })
    } catch (error) {
        return res.status(404).json({
            data: null,
            error: "Not found !"
        })
    }
}