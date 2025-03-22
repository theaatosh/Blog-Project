import express from "express";
import { getBlogs, getBlogsByCategory,getFullBlog } from '../controller/getBlogs.js';

const router = express.Router();
router.get("/", getBlogs);
router.get("/full/:id", getFullBlog);
router.get("/:category", getBlogsByCategory);
export default router;