import { User } from "../model/user.js";
export const passwprdOtpVerify = async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({ message: "Email and otp is required" });
    }
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Check if OTP is correct
        if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }
        if(Date.now()>user.otpCreatedAt){
            return res.status(400).json({ message: "OTP expired" });
        }
        if(otp===user.otp){
            return res.status(200).json({ message: "OTP verified successfully" });
        }

    }
       catch(err){
        res.status(500).json({message:"Erorr verifying otp"})
       }
}