import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";

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
}

export default new UserController();
