import jwt from "jsonwebtoken";
export const generateToken=(user,res)=>{
    const id=user._id
    const token=jwt.sign({id},process.env.secretKey,{expiresIn:"5d"})
    res.cookie("jwt",token,{
        maxAge:5*24*60*60*1000,
        httpOnly:true,
        sameSite:"lax",
        secure:process.env.NODE_ENV !=="development",
    });
    
    
}
