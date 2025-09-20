import express from 'express'
import cookieParser from 'cookie-parser'
import UserRoutes from "./routes/User.routes.js"
import FoodPartnerRoutes  from "./routes/FoodPartner.routes.js"
import FoodItemRoutes from "./routes/foodItem.routes.js"

const app = express()
import dotenv from "dotenv";


dotenv.config();
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",UserRoutes )
app.use("/api/auth",FoodPartnerRoutes )
app.use("/api/food",FoodItemRoutes)

export default app