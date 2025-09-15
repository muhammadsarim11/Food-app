import mongoose  from "mongoose";

const uri = "mongodb://localhost:27017/food-app"

export const ConnectDB = async ()=>{

  try {
    await  mongoose.connect(uri,{
            useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log("db connected!")
  } catch (error) {
    console.log(error)
    
  }
}