import express from "express";
import { registerUser } from "../controller/registerUser.js";
import { loginUser } from "../controller/loginUser.js";
import { verifyOtp } from "../controller/verifyOtp.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/register/verify", verifyOtp);
router.post("/login", loginUser);
export default router;
