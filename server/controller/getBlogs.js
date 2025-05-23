import { Blog } from "../model/createBlog.js";
import { Comment } from "../model/comment.js";

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: "approved" }).populate({
      path: "createdBy",
      select: "fullName photo",
    });
    const blogsDetails = [];
    for (let i = 0; i < blogs.length; i++) {
      try {
        const cmtNum = await Comment.countDocuments({ postId: blogs[i]._id });

        blogsDetails.push({
          blog: blogs[i],
          totalLikes: blogs[i].blogLikedUser.length,
          commentCounter: cmtNum,
        });
      } catch (err) {
        console.log(err);
      }
    }
    res.status(200).json({ blogs: blogsDetails });
  } catch (err) {
    console.log(err);
  }
};

export const getBlogsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const query =
      category === "All"
        ? { status: "approved" }
        : { category, status: "approved" };
    const blogs = await Blog.find(query).populate({
      path: "createdBy",
      select: "fullName photo",
    });
    res.status(200).json({ blogs: blogs });
  } catch (err) {
    console.log(err);
  }
};

export const getFullBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id).populate({
      path: "createdBy",
      select: "fullName photo",
    });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const cmtNum = await Comment.countDocuments({ postId: id });
    res.status(200).json({ blog: blog, commentCounter: cmtNum });
  } catch (err) {
    console.log(err);
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.log(err);
  }
};
