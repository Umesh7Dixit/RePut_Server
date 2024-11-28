import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {signupUser , loginUser, getUserProfile, createUserDetails, forgotPassword, resetPassword } from '../controllers/userController.js'

const router = express.Router();

router.post('/signup' , signupUser);
router.post('/login'  , loginUser);
router.get('/profile/:userid', protectRoute , getUserProfile );
router.get('/profile/:userid' , getUserProfile );

// router.post('/register', protectRoute, createUserDetails);
router.post('/register',  createUserDetails);
router.post('/forgot-password',  forgotPassword);
router.get('/reset-password',  resetPassword);



export default router;