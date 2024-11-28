import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import generateTokenAndSetCookie from '../utils/helpers/generateTokenAndSetCookie.js'
import mongoose from 'mongoose';


export const signupUser = async (req, res)=> {

    try {
        const {email , password} = req.body;
        const user = await User.findOne({email});

        if(user)return res.status(400).json({error: "User already exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(200).json({message: "user created" , newUser});

        
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error in signupUser" + error.message);
    }

};


export const loginUser = async (req, res)=>{

    try {

        const {email , password} = req.body;

        const user = await User.findOne({email});
        if(!user) return res.status(400).json({error: "User does not exist"});
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        console.log(isPasswordCorrect);

        if( !isPasswordCorrect)return res.status(400).json({error: "Invalid user name or Password "});
        // token creation
        generateTokenAndSetCookie(user._id,email, res);

        console.log("user: " ,user);

        res.status(200).json({
            _id : user._id,
            email: user.email
        });


        
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error in loginUser: " , error.message);
    }

};


export const getUserProfile = async (req,res) => {

    try {

        const {userid} = req.params;  // user id
        let user;

        user = await User.findOne({ _id: userid }).select("-password").select("-updatedAt");


        if(!user) return res.status(404).json({error: "User not found"});

        res.status(200).json(user);
        
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("error in GetUserProfile",error);
    }

};









// _______________________________________________________


import { UserDetails } from "../models/userModel.js";


export const createUserDetails = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, industry, gstNumber, companyName, address } = req.body;

    const userDetails = new UserDetails({
      firstName,
      lastName,
      phoneNumber,
      industry,
      gstNumber,
      companyName,
      address
    });

    await userDetails.save();  // save user details

    res.status(201).json(userDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in createUserDetails: ", error.message);
  }
};





// ___________________________Reset Password______________________________________



import nodemailer from 'nodemailer';
import randomstring from "randomstring";


export const sendResetPasswordMail = async(email, token)=> {

  try {

    var transporter = nodemailer.createTransport({
      host:'smtp.gmail.com',
      port: 587,  // default port
      secure: false,
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        // pass: process.env.EMAIL_PASS,         
        pass: 'dgvywgvfudlagahy',         
      }
    });


    const mailOptions = {
      from: process.env.EMAIL_USER, 
      to: email,
      subject: 'Reset Password',
      // text: `Hello ,\n\n
      // Please use the following link to reset your password: \n\n
      // "http://${process.env.SERVER_URL}/api/reset-password?token='+${token}+ '"\n\n
      // If you did not request this password reset, please ignore this email.\n\n
      // Regards,\n
      // Your Team`

      html: `<p>Hi,</p>
      <p>Please click the link below to reset your password:</p>
      <a href="http://localhost:5000/api/user/reset-password?token=${token}">Reset your password</a>
      <p>If you did not request a password reset, please ignore this email.</p>\n
      <p>Regards<p>\n
       RePut Team`
   }

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: '+ info.response);
      }
    });
    
  } catch (error) {
    res.status(400).send({success:false, message:error.message});
  }

}


export const forgotPassword = async (req, res) => {

  try {
    
      const { email } = req.body;
      const userData = await User.findOne({email});

      if(userData){
        const randomString = randomstring.generate();
        const data = await User.updateOne({email},{$set: {token: randomString}});
        
        // sendResetPasswordMail(userData.name, userData.email, randomString );
        sendResetPasswordMail( userData.email, randomString );
        
        res.status(200).send({success:true, message:"Please check your email"});

      }else{
        res.status(200).send({success:true, message:"Invalid Email"});
      }

  } catch (error) {
    res.status(400).send({success:true, message:error.message});
  }

};



// ---------Reset Password


export const resetPassword = async (req, res) => {

  try {

    const token = req.query.token;
    const tokenData = await User.findOne({ token: token});

    if(tokenData)
    {
      const  password  = req.body.password;
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const userData = await User.findByIdAndUpdate({_id: tokenData._id}, {$set:{password: hashedPassword,token:''}},{new: true});
      res.status(200).send( {success:true, message:"Passwords updated successfully", data:userData});
    }
    else{
      res.status(200).send({success:false, message:"This link has been expired."});
    }

    const userData = await User.findOne({token});
    
  } catch (error) {
    res.status(400).send({success:true, message:error.message});
  }

}