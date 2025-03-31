import { Blog } from "../model/createBlog.js";
export const blogLikeCounter = async (req, res) => {
  const { blogId, userId } = req.body;
  try {
    const blogDetails = await Blog.findById(blogId);
    if (!blogDetails) {
      return res.status(404).json({ message: "blog does not exist" });
    }
    if (!blogDetails.blogLikedUser.includes(userId)) {
      blogDetails.blogLikedUser.push(userId);
      await blogDetails.save();
      return res
        .status(200)
        .json({ message: "Blog liked successfully", blog: blogDetails });
    } else {
      blogDetails.blogLikedUser.pull(userId);
      await blogDetails.save();
      return res
        .status(200)
        .json({ message: "Blog unliked successfully", blog: blogDetails });
    }
  } catch {
    res.status(500).json({ message: "Server error", error });
  }
};
