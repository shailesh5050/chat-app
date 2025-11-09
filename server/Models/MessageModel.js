import mongoose from "mongoose";
import UserModel from "./UserModel.js";
const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content :String,
  createdAt :{default:Date.now,type:Date}
});

const MessageModel = mongoose.model("message",messageSchema)

export default MessageModel