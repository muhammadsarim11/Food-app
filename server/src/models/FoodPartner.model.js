import mongoose from 'mongoose'



const foodPartnerSchema = mongoose.Schema({

    username:{
        type:String,
        required:true,

    },

    email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true,
        select:false
    }
},{
    TimeStamps:true
})



export const foodPartner = mongoose.model("foodPartner",foodPartnerSchema)