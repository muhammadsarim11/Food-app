import express from 'express'
import UserRoutes from "./routes/User.routes.js"
import FoodPartnerRoutes  from "./routes/FoodPartner.routes.js"



const app = express()
app.use(express.json())


app.use("/api/auth",UserRoutes )
app.use("/api/auth",FoodPartnerRoutes )


export default app