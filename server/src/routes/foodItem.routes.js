
import express from 'express';
import { CreateFoodItem } from '../controllers/Food.Item.controller.js';
import { AuthFoodPartner } from '../middlewares/protected.js';
import multer from 'multer';

const upload = multer({
    storage: multer.memoryStorage()
})


const router = express.Router();

router.post("/create",AuthFoodPartner,upload.single("video"), CreateFoodItem);

export default router;