import { Comment } from "../model/comment.js";
export const getComments = async (req, res) => {
  const { id } = req.params;
  try {
    const blogCmt = await Comment.find({ blogId: id }).populate({ path: "userId",select:"fullName photo" });
    if (!blogCmt) {
      return res.status(400).json({ message: "could not find comment" });
    }
    res.status(200).json({message:"comment fetched",data:blogCmt});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
