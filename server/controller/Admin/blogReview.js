
import {Blog} from "../../model/createBlog.js";

const getblogReview = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: "pending" });
    res.status(200).json({ blogs: blogs });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
const singleBlogReview = async (req, res) => {
  console.log("Single blog review called");
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ blog: blog });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
const approveBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    blog.status = "approved";
    await blog.save();
    res.status(200).json({ message: "Blog approved successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const rejectBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    blog.status = "rejected";
    await blog.save();
    res.status(200).json({ message: "Blog rejected successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getblogReview, approveBlog, rejectBlog, singleBlogReview };
