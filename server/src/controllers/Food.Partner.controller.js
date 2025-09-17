import { foodPartner } from "../models/FoodPartner.model"

import bcrypt from 'bcrypt'




export const RegisterFoodPartner = async (req,res)=>{

  try {
      const {username,email,password} = req.body
  
      if(!(username && email && password)){
          return res.status(400).json({
              message:"fill the required fields!"
          })
      }
  
  
      const IsExist =  await foodPartner.findOne({email})
  
      if(IsExist){
          return res.status(400).json({
              message:"user already exist!"
          })
      }
  const hashedPassword = await bcrypt.hash(password,10)
  
  const FoodPartner = await foodPartner.create({
      username,
      email,
      password:hashedPassword
  })
  
  
  const partnerResponse = FoodPartner.toObject()
  
  delete partnerResponse.password
  
  
  
  return res.status(200).json({
      message:"success",
      partnerResponse
  })
  
  } catch (error) {
    res.status(500).json({
        message:"internal error!"
    })
  }

}

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({
        message: "Please enter the required fields!",
      });
    }

    const user = await foodPartner.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

   
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials!",
      });
    }

    
    const token = jwt.sign(
      { id: user._id, email: user.email }, // payload
      process.env.JWT_SECRET,              
      { expiresIn: "3d" }                  // expiry time
    );
  res.cookie("token", token, {
    httpOnly: true, // frontend JS se access nahi hoga
    secure: process.env.NODE_ENV === "production", // sirf https par
    sameSite: "strict",
    maxAge: 48 * 60 * 60 * 1000, // 1 din
  });

  // 
  res.setHeader("Authorization", `Bearer ${token}`);

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
