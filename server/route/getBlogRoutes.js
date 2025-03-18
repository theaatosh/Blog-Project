import express from "express";
import { getBlogs, getBlogsByCategory,getFullBlog } from "../controller/getBlogController";

const router = express.Router();
router.get("/", getBlogs);
router.get("/full/:id", getFullBlog);
router.get("/:category", getBlogsByCategory);
export default router;