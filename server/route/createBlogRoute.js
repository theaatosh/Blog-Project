import express from "express";
const router = express.Router();

import { createBlog } from "../controller/createBlog.js";
import { upload } from "../middleware/generateImageUrl.js";
import verifyjwt from "../middleware/jwtVerification.js";

router.post("/", upload.single("image"), verifyjwt, createBlog);

export default router;
