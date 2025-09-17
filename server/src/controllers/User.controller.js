
import jwt from "jsonwebtoken";
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


export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({
        message: "Please enter the required fields!",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    // ✅ Password check
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials!",
      });
    }

    // ✅ JWT Token generate
    const token = jwt.sign(
      { id: user._id, email: user.email }, // payload
      process.env.JWT_SECRET,              // secret key (env me rakho)
      { expiresIn: "3d" }                  // expiry time
    );
  res.cookie("token", token, {
    httpOnly: true, // frontend JS se access nahi hoga
    secure: process.env.NODE_ENV === "production", // sirf https par
    sameSite: "strict",
    maxAge: 48 * 60 * 60 * 1000, // 1 din
  });

  // ✅ Header me bhi bhejdo
  res.setHeader("Authorization", `Bearer ${token}`);

    // ✅ Password hide karke user object bhejo
    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(200).json({
      message: "Login successful!",
      token,
      user: userResponse,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

export const LogoutUser = async (req, res) => {
  try {
    
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Logged out successfully!"
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message
    });
  }
};
