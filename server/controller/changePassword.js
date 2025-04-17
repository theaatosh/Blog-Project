import {User} from '../model/user.js';
import bcrypt from "bcrypt";
export const changePassword=async(req,res)=>{
    const userId=req?.user?._id;
    const {currentPassword,newPassword}=req.body;
    try{

    if(!currentPassword.trim() || !newPassword.trim()){
        return res.status(400).json({message:"Please fill all the fields"});
    }

    const userExits=await User.findById(userId);
    if(!userExits){
        return res.status(404).json({message:"user not found"});
    }
    
    const checkPassword=await bcrypt.compare(currentPassword,userExits.password);
    if(!checkPassword){
      return  res.status(400).json({message:"Old password doesnt match"});
    }

    const hashedPassword=await bcrypt.hash(newPassword,10);
    userExits.password=hashedPassword;
    await userExits.save(); 
    res.status(200).json("Password changed successfully");

    }
    catch(err){
        res.status(500).json({message:"Error changing password",error:err});
    }
    
}
