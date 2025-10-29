import mongoose from "mongoose";
import UserModel from "./UserModel";
const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: UserModel },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: UserModel },
  content :String,
  createdAt :{default:Date.now(),type:Date}
});

const MessageModel = mongoose.model("Messages",messageSchema)

export default MessageModel