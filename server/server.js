import app from "./src/app.js";
import { ConnectDB } from "./src/db/db.js";


ConnectDB()













app.listen(3000,()=>{
    console.log("server is running")
})