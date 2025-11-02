import jwt from "jsonwebtoken"

export default function authMiddleware(req, res, next) {
    try {
        const token = req.cookies?.token;
        
        console.log("Cookies received:", req.cookies);
        console.log("Token from cookies:", token);

        if (!token) {
            return res.status(401).json({message: "No token, authorization denied"})
        }

        const decoded = jwt.verify(token, process.env.SECRET)
        req.userId = decoded.user._id;
        next()
    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(401).json({ message: 'Invalid or expired token' })  
    }
}