import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
  },
  otpCreatedAt: {
    type: Date,
    default: Date.now, // Stores the timestamp when OTP is generated
  },
  status: {
    type: String,
    default: "pending",
  },
});

export const User = mongoose.model("User", userSchema);
