import jwt from 'jsonwebtoken'
import { foodItem } from '../models/foodItem.model.js'




export const AuthFoodPartner =async (req,res,next)=>{
    
    const token = req.cookies.token


   try {
     if(!token){
        return res.status(401).json({

            message:"token not found!"
        })

    }


    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    const foodPartner =  await foodItem(decoded._id)

    req.foodPartner = foodPartner

    next()
   } catch (error) {
    
    res.status(500).json({
        message:"internal server error!"
    })
   }
}