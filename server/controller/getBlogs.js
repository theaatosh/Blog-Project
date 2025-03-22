import { Blog } from "../model/createBlog.js";
import { Comment } from "../model/comment.js";

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
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
  console.log(category);
  
  try {
   const query=category==="All"?{}:{category}
    const blogs = await Blog.find(query);
    res.status(200).json({ blogs: blogs });
  } catch (err) {
    console.log(err);
  }
};

export const getFullBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const cmtNum = await Comment.countDocuments({ postId: id });
    res.status(200).json({ blog: blog, commentCounter: cmtNum });
  } catch (err) {
    console.log(err);
  }
};
