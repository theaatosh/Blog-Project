import express from "express";
import { registerUser } from "../controller/registerUser.js";
import { loginUser } from "../controller/loginUser.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
export default router;
