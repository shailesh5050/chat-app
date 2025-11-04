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

      const user = await UserModel.findOne({ email });
      
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Compare password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      delete user.password;
      
      // Generate JWT token
      const token = jwt.sign({ user }, process.env.SECRET);
      
      // Set cookie with proper configuration for cross-origin requests
      res.cookie('token', token, {
        httpOnly: true,     // JS can't read it — safer
        secure: false,      // Set to false for development (HTTP)
        sameSite: 'lax',    // Use 'lax' for development
        path: '/',          // Make cookie available for all paths
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });
      
      console.log("Setting cookie:", token.substring(0, 10) + "...");
      
      return res.status(200).json({ 
        data: { email: user.email, id: user._id }, 
        message: "Login Successfully" 
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  
}

export default new UserController();
