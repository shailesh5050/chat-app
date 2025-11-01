import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
class UserController {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      // Password strength validation
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters long" });
      }

      // Check if user already exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res
          .status(409)
          .json({ message: "User with this email already exists" });
      }

      if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await UserModel.create({ username, email, password: hashedPassword });

      return res.status(201).json({ message: "User created successfully." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const user = await UserModel.findOne({ email })

       // Compare password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }


      const token = jwt.sign({ user }, process.env.SECRET)
      res.cookie('token', token, {
        httpOnly: true,    // JS can't read it — safer
        secure: false,     // true in production (HTTPS)
        sameSite: 'lax',   // helps prevent CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      })
      return res.status(200).json({ data: { emai: user.email, id: user._id }, message: "Login Successfully" });



    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  
}

export default new UserController();
