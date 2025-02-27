import mongoose from "mongoose";

const blog = new mongoose.Schema(
  {
    blogTitle: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    blogContent: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    blogLikedCounter: {
      type: Number,
      default: 0,
    },
    blogLikedUser: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    blogRating:{
      
    }
  },
  { timestamps: true }
);
export const Blog = mongoose.model("Blog", blog);
