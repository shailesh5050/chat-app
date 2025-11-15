import jwt from "jsonwebtoken";
import cookie from "cookie";

const userSocketMap = new Map();
export default function registerSocketHandlers(io) {
  io.use((socket, next) => {
    // Try to get token from auth (Hoppscotch / manual)
    const tokenFromAuth = socket.handshake.auth?.token;

    // Or parse from cookie (browser)
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    const tokenFromCookie = cookies.token;

    const token = tokenFromAuth || tokenFromCookie;
    if (!token) return next(new Error("No token"));
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      socket.userId = decoded.user._id;
      next();
    } catch (error) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    userSocketMap.set(socket.userId, socket.id);

    socket.on("private-message", (msg) => {
      console.log("Private message from", socket.userId, ":", msg);
      // handle private chat events
       const recipientSocketId = userSocketMap.get(msg.recipientId);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("new-message", msg);
      }
    });

     
    });
  
}
