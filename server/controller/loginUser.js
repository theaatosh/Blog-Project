import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken.js";

const checkEmail = async (email) => {
  const match = await User.findOne({ email: email });
  return match ? true : false;
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const isEmailAvailable = await checkEmail(email);
    if (!isEmailAvailable) {
      return res.status(400).json({ message: "invalid credentials" });
    }
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
  try {
    const user = await User.findOne({ email: email });
    if (user.status !== "active") {
      return res.status(400).json({ message: "please verify your email" });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({ message: "invalid credentials" });
    }
    const secretKey = process.env.secretKey;
    const token = await jwt.sign({ fullName: user.fullName }, secretKey, {
      expiresIn: "24h",
    });

    res.cookie("token", token, {
      maxAge: 5 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
    generateToken(user, res);

    res.status(200).json({ message: "login successfully", user });
  } catch (err) {
    res.status(200).json({ message: "login successfully", user });
  }
};
