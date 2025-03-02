import { Blog } from "../model/createBlog.js";
import { Comment } from "../model/comment.js";

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    const blogsDetails = [];
    for (let i = 0; i < blogs.length; i++) {
      try {
        const cmtNum = await Comment.countDocuments({ postId: blogs[i]._id });
        blogsDetails.push({ blog: blogs[i], commentCounter: cmtNum });
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
    const blogs = await Blog.find({ category });
    res.status(200).json({ blogs: blogs });
  } catch (err) {
    console.log(err);
  }
};
