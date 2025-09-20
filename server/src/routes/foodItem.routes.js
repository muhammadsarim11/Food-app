
import express from 'express';
import { CreateFoodItem, GetFoodItems } from '../controllers/Food.Item.controller.js';
import { AuthFoodPartner, AuthUser } from '../middlewares/protected.js';
import multer from 'multer';

const upload = multer({
    storage: multer.memoryStorage()
})


const router = express.Router();

router.post("/create",AuthFoodPartner,upload.single("video"), CreateFoodItem);
router.get("/all",AuthUser,GetFoodItems)

export default router;