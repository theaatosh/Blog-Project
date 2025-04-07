import express from "express";
import verifyjwt from "../middleware/jwtVerification.js";
import { comment } from "../controller/comment.js";
import { getComments } from "../controller/getComments.js";

const router = express.Router();
router.post("/add/:id", verifyjwt, comment);
router.get('/get/:id',verifyjwt,getComments)

export default router;
