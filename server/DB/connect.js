import mongoose from "mongoose";
async function connectDB(uri) {
    try {
        await mongoose.connect(uri)
        console.log("Connected To DB")
    } catch (error) {
        console.error(error)  
    }
}

export default connectDB;