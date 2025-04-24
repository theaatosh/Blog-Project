import express from "express";

import { getBlogs, getBlogsByCategory,getFullBlog } from '../controller/getBlogs.js';
import { deleteMyBlog, editMyBlog, fetchMyBlogs } from "../controller/myBlogs.js";
import verifyjwt from "../middleware/jwtVerification.js";
import { upload } from "../middleware/generateImageUrl.js";


const router = express.Router();
router.get("/", getBlogs);
router.get("/fetch/:category", getBlogsByCategory);
router.get("/full/:id", getFullBlog);
router.get("/myBlogs",verifyjwt,fetchMyBlogs)
router.patch('/update/:id',upload.single("image"),verifyjwt,editMyBlog);
router.delete('/delete/:id',verifyjwt,deleteMyBlog)
export default router;
