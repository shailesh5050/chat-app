import express from 'express'
import UserController from '../Controller/UserController.js'
import authMiddleware from '../middleware/authMiddleware.js'
const userRoutes = express.Router()

userRoutes.post('/register',UserController.register)
userRoutes.post('/login',UserController.login)
userRoutes.get("/verify",authMiddleware,(req,res)=>{
    res.status(200).json({message: "Token is valid"})
})

export default userRoutes