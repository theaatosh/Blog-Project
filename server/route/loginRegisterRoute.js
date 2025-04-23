import express from "express";
import { registerUser } from "../controller/registerUser.js";
import { loginUser } from "../controller/loginUser.js";
import { verifyOtp } from "../controller/verifyOtp.js";
import { logout } from "../controller/logout.js";
import { checkAuth } from "../controller/checkAuth.js";
import verifyjwt from "../middleware/jwtVerification.js";
import { updateUser } from "../controller/updateUser.js";
import { upload } from "../middleware/generateImageUrl.js";
import { fetchSingleUser } from "../controller/fetchSingleUser.js";
import { changePassword } from "../controller/changePassword.js";
import { forgotPassword } from "../controller/forgotPassword.js";
import { passwprdOtpVerify } from "../controller/passwordOtpVerify.js";
import { creatingPassword } from "../controller/creatingPassword.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/register/verify", verifyOtp);
router.post("/login", loginUser);
router.post("/logout",logout);
router.get('/check-auth',verifyjwt,checkAuth)
router.patch('/update',verifyjwt,upload.single("image"),updateUser);
router.get('/fetch/:id',verifyjwt,fetchSingleUser),
router.patch('/change-password',verifyjwt,changePassword);
router.post('/forgot-password',forgotPassword);
router.post('/verify-otp',passwprdOtpVerify);
router.post('/create-password',creatingPassword)




export default router;
