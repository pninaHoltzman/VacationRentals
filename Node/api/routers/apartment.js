import express from "express";
import {deleteApartment,updateApartment,addApartment, getAllApartments, getApartmentById, getApartmentByCategory, getApartmentByCity, getApartmentByRangeBed, getApartmentByRangePrice, getApartmentByAdverteiser} from "../controllers/apartment.js"
import { checkAuthorization } from "../middleWares.js";

// import {checkAuthorization,cityExists,categoryExists,adverteiserExists} from "../middleWares.js"
const router = express.Router();
router.post('',checkAuthorization,addApartment)
router.get('/getAllApartments',getAllApartments)
router.get('/getApartmentById/:id',getApartmentById)
router.get('/getApartmentByCategory/:id',getApartmentByCategory)
router.get('/getApartmentByCity/:id',getApartmentByCity)
router.get('/getApartmentByAdverteiser/:id',checkAuthorization ,getApartmentByAdverteiser)

router.patch('/:id/:idA',updateApartment)
router.delete('/:id/:idA',deleteApartment);

router.get('/getApartmentByRangePrice/:min/:max',getApartmentByRangePrice)
router.get('/getWeather/:city')

router.get('/:min/:max',getApartmentByRangeBed)


// router.post('',checkAuthorization,cityExists,categoryExists,adverteiserExists,addApartment)

// router.patch('/:id',cityExists,categoryExists,adverteiserExists,updateApartment)
export default router;