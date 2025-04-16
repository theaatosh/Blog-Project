import {User} from "../model/user.js"
import bcrypt from "bcrypt";
export const updateUser=async(req,res)=>{
    const userId=req.user;
        const {fullName,email,password}=req.body;
        const imageUrl=req?.file?.path;
        console.log(req.file);
        
        const hashedPassword=await bcrypt.hash(password,10);

        const data={
            fullName,
            email,
            password:hashedPassword,
            photo:imageUrl
        }

        try{
            const user=await User.findByIdAndUpdate(userId,data,{new:true});     
            
            res.status(200).json({message:"user updated successfully",data:user});

        }catch(err){
            console.log("error while updating user",err);
            res.status(500).json({message:"Error while updating user",error:err});
            
        }

}   