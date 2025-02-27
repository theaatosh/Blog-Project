import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Blog",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    commentText: {
      type: String,
      required: true,
    },
    commentLikedCounter: {
      type: Number,
      default: 0,
    },
    commentLikedUsers: {
      type: [mongoose.Schema.Types.ObjectId], // Array of user IDs who liked the post
      ref: "User",
      default: [],
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
