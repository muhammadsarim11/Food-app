import { ConnectDB } from "./src/db/db.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
import app from "./src/app.js";
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

ConnectDB()













app.listen(3000,()=>{
    console.log("server is running")
})