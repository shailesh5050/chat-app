import express from 'express';
import {Server} from "socket.io"
import http from "http"
import cors from "cors"
import dotenv from "dotenv";
import connectDB from './DB/connect.js';
import userRoutes from './Routes/UserRoute.js';
dotenv.config();
connectDB(process.env.DB_URI)
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});


app.use(cors());
app.use(express.json())

const PORT = process.env.PORT || 3000;

app.use('/api/user',userRoutes)

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});