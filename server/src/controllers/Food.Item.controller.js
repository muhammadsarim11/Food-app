import { foodItem } from "../models/foodItem.model.js";
import { UploadVideo } from "../services/Imagekit.service.js";
import { v4 } from 'uuid'


export const CreateFoodItem = async (req, res) => {

    try {
        const { name, description } = req.body;
        const file = req.file.buffer

        if (!(name && description && file)) {
            return res.status(400).send("All fields are required");
        }

        const fileResponse = await UploadVideo(file, v4())
        console.log(fileResponse)
        const FoodItem = await foodItem.create({
            name,
            description,
            video: fileResponse.url,
            foodPartner: req.foodPartner._id
        })


        return res.status(201).json({
            success: true,
            FoodItem

        })
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }


}




export const GetFoodItems = async (req, res) => {
    try {
        const FoodItems = await foodItem.find()
        return res.status(200).json({
            success: true,
            FoodItems
        })
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}   