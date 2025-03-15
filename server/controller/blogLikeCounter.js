import { createBlog } from "../model/createBlog.js";
export const blogLikeCounter = async (req, res) => {
  const { blogId, userId } = req.body;
  try {
    const blog = await createBlog.findById(blogId);
  } catch {
    return res.status(404).json({ message: "Blog not found" });
  }
};
