import mongoose from "mongoose";
import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}

async function sendEmailOTP(email, otp) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hamrokitchen1122@gmail.com",
      pass: "yfjz fird rxew vgnr",
    },
  });
  const mailOptions = {
    from: "hamrokitchen1122@gmail.com",
    to: email,
    subject: "Your OTP Code for Password Reset",
    text: `Your OTP is ${otp}. It will expire in 3 minutes.`,
  };
  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    res.status(500).json({message:"Error sending OTP:", error});
    return false;
  }
}

// Updated checkEmail to return true if email exists
const checkEmail = async (email) => {
  const match = await User.findOne({ email: email });
  return match ? true : false;
};

const hashPassword = async (password) => {
  const saltRounds = parseInt(process.env.saltRounds);
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Validate email
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Check if email exists
    const emailExists = await checkEmail(email);
    if (!emailExists) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Generate OTP and set expiry (3 minutes)
    const otp = generateOTP();
    const otpExpires = Date.now() + 3 * 60 * 1000; // 3 minutes in milliseconds

    // Find user and save OTP and expiry
    const user = await User.findOne({ email });
    user.otp = otp;
    user.otpCreatedAt = otpExpires;
    await user.save();

    // Send OTP to email
    const sendMail = await sendEmailOTP(email, otp);
    if (!sendMail) {
      return res.status(500).json({ message: "Error sending OTP" });
    }

    return res.status(200).json({
      message: "OTP sent to your email",
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};