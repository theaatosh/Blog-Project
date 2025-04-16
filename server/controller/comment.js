import { Comment } from "../model/comment.js";
import { Blog } from "../model/createBlog.js";
export const comment = async (req, res) => {
  const {id:blogId} = req.params;
  const { commentText} = req.body;
  const { _id: userId } = req.user;
  
  
  
  if (!commentText) {
    return res.status(400).json("fill the comment box");
  }
  try {
    const postExists = await Blog.findById(blogId);
    if (!postExists) {
      return res.status(400).json({ message: "Post not found" });
    }
    console.log(blogId,userId,commentText);
    
    const newComment = new Comment({
      blogId,
      userId,
      commentText,
    });
    await newComment.save();
    return res.status(200).json({ message: "comment added" });
  } catch (err) {
    console.log(err);
  }
};
