import { User } from "../models/User.model.js";
import bcrypt from 'bcrypt'




export const RegisterUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!(username && email && password)) {
      return res.status(400).json({ message: "Enter the required fields!!" });
    }

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(201).json({
      message: "Successfully created!",
      newUser: userResponse,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};