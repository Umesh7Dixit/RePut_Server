import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {signupUser , loginUser, getUserProfile } from '../controllers/userController.js'

const router = express.Router();

router.post('/signup' , signupUser);
router.post('/login'  , loginUser);
router.get('/profile/:userid', protectRoute , getUserProfile );




export default router;