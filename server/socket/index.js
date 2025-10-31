import jwt from "jsonwebtoken";
import cookie from "cookie";
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
      socket.userId = decoded.user.id;
      next();
    } catch (error) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.userId);

    socket.on("message", (msg) => {
      console.log("Message from", socket.userId, ":", msg);
      // handle chat events
    });
  });
}
