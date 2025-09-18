import mongoose  from "mongoose";





const FoodSchema = mongoose.Schema({
    itemName:{
        type:String,
        required:true
    },

    descrition:{
             type:String,
       
    },

    video:{
            type:String,

        required:true
    },

    foodPartner:{
type:mongoose.Schema.Types.ObjectId,
ref:'foodPartner'
    }
})


export const foodItem = mongoose.model('foodItem',FoodSchema)