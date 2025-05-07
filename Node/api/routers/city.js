import { addCity, getAllCities } from "../controllers/city.js";
import express from "express";
import { checkAuthorization } from "../middleWares.js";


const router = express.Router()
router.get('', getAllCities)
router.post('/add',checkAuthorization, addCity)

export default router
