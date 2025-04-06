import express from "express";
import verifyjwt from "../middleware/jwtVerification.js";
import { blogLikeCounter } from "../controller/blogLikeCounter.js";

const router = express.Router();
router.post("/like/:id", verifyjwt, blogLikeCounter);

export default router;
