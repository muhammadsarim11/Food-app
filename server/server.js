import app from "./src/app.js";
import { ConnectDB } from "./src/db/db.js";
import dotenv from "dotenv";


dotenv.config();


ConnectDB()













app.listen(3000,()=>{
    console.log("server is running")
})