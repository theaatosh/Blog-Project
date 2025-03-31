import express from "express";
import {
  getBlogs,
  getBlogsByCategory,
  getFullBlog,
} from "../controller/getBlogs.js";

const router = express.Router();
router.get("/", getBlogs);
router.get("/:category", getBlogsByCategory);
router.get("/full/:id", getFullBlog);
export default router;
