import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  subject: { type: String },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: "pending" },
});

export const contactUs = mongoose.model("ContactUs", contactUsSchema);
