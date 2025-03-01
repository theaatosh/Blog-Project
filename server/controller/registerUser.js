import mongoose from "mongoose";
import { User } from "../model/user.js";
import bcrypt from "bcrypt";

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
  //   console.log(fullName, email, password);
  if (!fullName || !email || !password || !confirmPassword) {
    console.log("here validation");
    return res.status(400).json({ message: "please fill all the fields" });
  }
  if (password !== confirmPassword) {
    console.log("here password");
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
    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
