import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./database/connectDb.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const mongoDbUrl = process.env.mongoDbUrl;


app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,               
    
  })
);
app.use(express.json());
app.use(cookieParser());


import loginRegisterRoute from "./route/loginRegisterRoute.js";
app.use("/user", loginRegisterRoute);

import createBlogRoute from "./route/createBlogRoute.js";
app.use("/createblog", createBlogRoute);

import commentRoute from "./route/commentRoute.js";
app.use("/comment", commentRoute);

import blogLikeCounter from "./route/blogLikeCounterRoute.js";
app.use("/blog", blogLikeCounter);

import getBlogRoutes from "./route/getBlogRoutes.js";
import cookieParser from "cookie-parser";
app.use("/blog", getBlogRoutes);

app.listen(PORT, () => {
  connectDb(mongoDbUrl);
  console.log(`Server started on port ${PORT}`);
});
