import jwt from "jsonwebtoken";


const generateTokenAndSetCookie = ( userId,email , res)=> {

    const token = jwt.sign({userId,email}, process.env.JWT_SECRET, {expiresIn:'15d',})

    res.cookie('reputjwt',token,{
        httpOnly: true,
        maxAge: 15*24*60*60*1000,
        sameSite: "strict",
    });

    return token;
}

export default generateTokenAndSetCookie;