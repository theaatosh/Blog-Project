import express from "express";
import {
  userDetails,
  editUser,
  deleteUser,
} from "../../controller/Admin/userDetails.js";
const router = express.Router();

router.get("/userDetails", userDetails);
router.patch("/editUser/:id", editUser);
router.delete("/deleteUser/:id", deleteUser);

export default router;
