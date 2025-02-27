import mongoose from "mongoose";

export const connectDb = async (url) => {
  try {
    const conn = await mongoose.connect(url);
    console.log("Connected to mongoDb");
  } catch (err) {
    console.log(`error while connecting to mongoDb ${err}`);
  }
};
