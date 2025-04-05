import { Comment } from "../model/comment.js";
import { Blog } from "../model/createBlog.js";
export const comment = async (req, res) => {
  const { commentText, postId } = req.body;
  const { userId } = req.user;
  if (!commentText) {
    return res.status(400).json("fill the comment box");
  }
  try {
    const postExists = await Blog.findById(postId);
    if (!postExists) {
      return res.status(400).json({ message: "Post not found" });
    }
    const newComment = new Comment({
      postId,
      userId,
      commentText,
    });
    await newComment.save();
    return res.status(200).json({ message: "comment added" });
  } catch (err) {
    console.log(err);
  }
};
