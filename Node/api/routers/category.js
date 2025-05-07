import express from "express";
import { addCategory, getAllCategories } from "../controllers/category.js";
import { checkAuthorization } from "../middleWares.js";

const router = express.Router()
router.post('',checkAuthorization,addCategory)
router.get('',getAllCategories)

export default router