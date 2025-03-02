import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const mongoDbUrl = process.env.mongoDbUrl;

app.use(express.json());
app.use(cors());
import { connectDb } from "./database/connectDb.js";

import loginRegisterRoute from "./route/loginRegisterRoute.js";
app.use("/user", loginRegisterRoute);

import createBlogRoute from "./route/createBlogRoute.js";
app.use("/createblog", createBlogRoute);

import commentRoute from "./route/commentRoute.js";
app.use("/comment", commentRoute);

app.listen(PORT, () => {
  connectDb(mongoDbUrl);
  console.log(`Server started on port ${PORT}`);
});
