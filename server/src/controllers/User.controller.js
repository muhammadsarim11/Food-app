import { User } from "../models/User.model.js";
import bcrypt from 'bcrypt'



export const RegisterUser = async (req,res)  =>{

try {
    const {username,email,password}  = req.body
    
    if(!(username && email && password)){
    
        return res.status(400).json({
            message:
                "enter the required fields!!"
            
        })
    
    }
    
    
    const IsUserExist = await User.findOne({
        email
    })
    
    if(IsUserExist){
        return res.status(400).json({
            message:"User already exist!"
        })
    }
    
    const hashedPassword = await bcrypt.hash(password ,10) 
    
    
    const user = await User.create({
        username,
        email,
       password:hashedPassword
    })
    
    return res.status(200).json({
        message:"successfully created!",
        Newuser:{
        user
        }
    })
    
} catch (error) {
    
    res.status(400).json({
        message: error + "error!"
    })
}


}