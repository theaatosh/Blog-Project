import express from "express";
import contactUsForm from "../controller/contactusForm.js";
const router = express.Router();

router.post("/", contactUsForm);

export default router;
