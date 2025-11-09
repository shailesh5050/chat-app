import MessageModel from '../Models/MessageModel.js'
import mongoose from 'mongoose'

class MessageController{
    async getAllChats(req,res){
        try {
            const userId= new mongoose.Types.ObjectId(req.user._id);
            const messages = await MessageModel.find({
                $or:[
                    {sender:userId},
                    {recipient:userId}
                ]
            }).sort({createdAt:-1}).populate('sender recipient','username email')
            res.status(200).json({message:'All chats fetched successfully',messages})
            
        } catch (error) {
            res.status(500).json({message:'Internal server error',error:error.message})
        }
    }
}
export default new MessageController()