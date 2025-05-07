import express from 'express';
import {  getAll, login,signup } from "../controllers/adverteiser.js";


const router = express.Router()

// router.post('/login',checkEmail,login)
// router.post('/signup',checkEmail,signup)
router.post('',login)
router.post('/signup',signup)
router.get('',getAll)

export default router;