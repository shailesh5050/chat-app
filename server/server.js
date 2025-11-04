import express from 'express';
import {Server} from "socket.io"
import http from "http"
import cors from "cors"
import dotenv from "dotenv";
import connectDB from './DB/connect.js';
import userRoutes from './Routes/UserRoute.js';
import registerSocketHandlers from './socket/index.js';
import cookieParser from "cookie-parser";
import messageRoutes from './Routes/MessageRoute.js';
dotenv.config();
connectDB(process.env.DB_URI)
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json())
app.use(cookieParser());
const PORT = process.env.PORT || 3000;

app.use('/api/user',userRoutes)
app.use('/api/message',messageRoutes)
registerSocketHandlers(io)
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});