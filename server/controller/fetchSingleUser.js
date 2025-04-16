import {User} from "../model/user.js";
export const fetchSingleUser=async(req,res)=>{
    const {id}=req.params;
    try{
        const user=await User.findById(id);
        if(!user){
            return res.status(404).json({message:"no user found"});
        }
        res.status(200).json({message:"user found",data:user})    
    }catch(err){
        console.log(err);
    }
}