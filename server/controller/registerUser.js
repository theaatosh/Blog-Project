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
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It will expire in 3 minutes.`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully to", email);
    return true;
  } catch (error) {
    console.error("Error sending OTP:", error);
    return false;
  }
}

const checkEmail = async (email) => {
  const match = await User.findOne({ email: email });
  return match ? false : true;
};

const hashPassword = async (password) => {
  const saltRounds = parseInt(process.env.saltRounds);
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (err) {
    console.log(err);
  }
};

export const registerUser = async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;
  
  console.log(fullName, email, password, confirmPassword);
  if (!fullName || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "please fill all the fields" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "password do not match" });
  }
  const isEmailAvailable = await checkEmail(email);
  if (!isEmailAvailable) {
    return res
      .status(400)
      .json({ message: "user already exist, try another email " });
  }
  const hashedPassword = await hashPassword(password);

  try {
    const otp = generateOTP().toString();
    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword,
      otp: otp,
      otpCreatedAt: Date.now(),
    });
    await newUser.save();

    const sendmail = await sendEmailOTP(email, otp);
    if (!sendmail) {
      return res.status(500).json({ message: "Error sending OTP" });
    }
    return res
      .status(200)
      .json({ message: "User registered successfully and verify otp" ,
        email:newUser.email
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
