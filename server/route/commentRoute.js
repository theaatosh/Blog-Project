import express from "express";
import verifyjwt from "../middleware/jwtVerification.js";
import { comment } from "../controller/comment.js";

const router = express.Router();
router.post("/add", verifyjwt, comment);

export default router;
