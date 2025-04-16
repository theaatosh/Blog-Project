import express from "express";
import {
  getblogReview,
  approveBlog,
  rejectBlog,
  singleBlogReview,
} from "../../controller/Admin/blogReview.js";
const router = express.Router();

router.get("/", getblogReview);
router.patch("/approve/:id", approveBlog);
router.patch("/reject/:id", rejectBlog);
router.get("/singleBlogReview/:id", singleBlogReview);

export default router;
