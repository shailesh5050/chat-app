import jwt from "jsonwebtoken"

function authMiddleware(req,res,next){
    try {
        const token = req.cookies?.token;

    if(!token){
        return res.status(401).json({message: "No token, authorization denied"})
    }

    const decoded = jwt.verify(token,process.env.SECRET)
    req.userId = decoded.user.id;
    next()
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' })  
    }
}