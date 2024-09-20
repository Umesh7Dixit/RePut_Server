import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


const protectRoute = async (req, res, next)=> {

    try {

        const token = req.cookies.reputjwt;

        if(!token) return res.status(401).json({message: 'Unauthorized'});

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decode.userId).select("-password");

        console.log("Protect Route: " , user);

        req.user = user;

        next();
        
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error in ProtectRoute: ", error.message);
    }

};

export default protectRoute;