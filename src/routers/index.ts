import { Router } from "express"
import * as AuthController from '../controllers/auth.controller'
import { AuthGuard } from "../middlewares/JwtAuthGuard"
import * as UserController from '../controllers/user.controller'
import * as ExerciseController from '../controllers/exercise.controller'
import * as ResultController from '../controllers/result.controller'
import * as TopicController from '../controllers/topic.controller'
import { RoleGuard } from "../middlewares/RoleGuard"

const router = Router()

// Auth
router.post('/auth/login', AuthController.login)
router.post('/auth/register', AuthController.register)
router.get('/auth/refresh-token', AuthController.refreshToken)

// Profile
router.get('/user/get-profile', AuthGuard, UserController.getProfile)
router.put('/user/update-profile', AuthGuard, UserController.updateProfile)

// Exercise
router.post('/exercise/create', AuthGuard, RoleGuard, ExerciseController.createExercise)
router.get('/exercise/get-all', ExerciseController.getExercises)
router.get('/exercise/get-by-category', ExerciseController.getExercisesByCategory)
router.delete('/exercise/delete/:id', AuthGuard, RoleGuard, ExerciseController.deleteExercise)
router.get('/exercise/get-by-id/:id', ExerciseController.getExerciseById)

// Topic
router.post('/topic/create', AuthGuard, RoleGuard, TopicController.createTopic)
router.get('/topic/get-all', TopicController.getTopics)
router.delete('/topic/delete/:id', AuthGuard, RoleGuard, TopicController.deleteTopic)
router.get('/topic/get-by-id/:id', TopicController.getTopicById)

// Result
router.get('/result/get-by-user', AuthGuard, ResultController.getUserResult)
router.post('/result/submit', AuthGuard, ResultController.submitResult)
router.get('/result/ranking', ResultController.getRanking)

export default router