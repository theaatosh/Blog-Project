import express from "express";
const router = express.Router();

import { createBlog } from "../controller/createBlog.js";
import { upload } from "../middleware/generateImageUrl.js";

router.post("/", upload.single("image"), createBlog);

export default router;
