import express from 'express'
import UserController from '../Controller/UserController.js'
import authMiddleware from '../middleware/authMiddleware.js'
const userRoutes = express.Router()

userRoutes.post('/register',UserController.register)
userRoutes.post('/login',UserController.login)
userRoutes.get("/verify",authMiddleware,(req,res)=>{
    let user = {
        _id: req.user._id,
        username: req.user.username,
        email: req.user.email
    }
    res.status(200).json({message: "Token is valid",user})
})

export default userRoutes