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



// export const getUserDetails = async (req, res) => {
//   try {
//     const userDetails = await UserDetails.findById(req.params.id);

//     if (!userDetails) {
//       return res.status(404).json({ error: 'User details not found' });
//     }

//     res.status(200).json(userDetails);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//     console.log("Error in getUserDetails: ", error.message);
//   }
// };

// export const updateUserDetails = async (req, res) => {
//   try {
//     const userDetails = await UserDetails.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!userDetails) {
//       return res.status(404).json({ error: 'User details not found' });
//     }

//     res.status(200).json(userDetails);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//     console.log("Error in updateUserDetails: ", error.message);
//   }
// };

// export const deleteUserDetails = async (req, res) => {
//   try {
//     const userDetails = await UserDetails.findByIdAndDelete(req.params.id);

//     if (!userDetails) {
//       return res.status(404).json({ error: 'User details not found' });
//     }

//     res.status(200).json({ message: 'User details deleted' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//     console.log("Error in deleteUserDetails: ", error.message);
//   }
// };