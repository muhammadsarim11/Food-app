import { ConnectDB } from "./src/db/db.js";
import dotenv from "dotenv";


dotenv.config();
import app from "./src/app.js";


ConnectDB()













app.listen(3000,()=>{
    console.log("server is running")
})