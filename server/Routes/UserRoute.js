import express from 'express'
import UserController from '../Controller/UserController.js'
const userRoutes = express.Router()

userRoutes.post('/register',UserController.register)
userRoutes.post('/login',UserController.login)

export default userRoutes