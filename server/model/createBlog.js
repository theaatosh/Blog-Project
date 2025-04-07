import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  blogTitle: { type: String, required: true },
  blogContent: { type: String, required: true },
  imageUrl: { type: String },
  authorName: { type: String, required: true },
  authorImage: { type: String },
  category: { type: String },
  blogLikedUser: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  blogLikedCounter: { type: Number, default: 0 },
  
  createdAt: { type: Date, default: Date.now },
});

export const Blog =mongoose.model("Blog", blogSchema);
