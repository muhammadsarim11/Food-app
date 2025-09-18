import express from "express";
import { LoginFoodPartner, LogoutFoodPartner,  RegisterFoodPartner } from "../controllers/Food.Partner.controller.js";


const router = express.Router()



router.post("/register/partner",RegisterFoodPartner)
router.post("/login/partner",LoginFoodPartner)
router.get("/logout/partner",LogoutFoodPartner)


export default router