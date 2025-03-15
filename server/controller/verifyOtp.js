import User from "../models/user.js";

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: "Please fill all the fields" });
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
    const otpExpirationTime = 3 * 60 * 1000; // 3 minutes in milliseconds
    if (Date.now() - user.otpCreatedAt > otpExpirationTime) {
      await User.deleteOne({ email }); // Delete the user from the database
      return res.status(400).json({ message: "OTP expired" });
    }
    // Activate user and remove OTP
    await User.updateOne(
      { email },
      { status: "active", otp: null, otpCreatedAt: null }
    );
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};
