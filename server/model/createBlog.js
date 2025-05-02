import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  blogTitle: {
    type: String,
    required:true
  },
  blogContent: {
    type: String,
 required: [true, "Blog content is required"],
  },
  category: {
    type: String,
    required: true,
   
  },
  imageUrl: {
    type: String,
    default: "",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Blog creator is required"],
  },
  blogLikedCounter: {
    type: Number,
    default: 0,
    min: [0, "Likes cannot be negative"],
  },
  blogLikedUser: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  status: {
    type: String,
    enum: ["draft", "pending", "approved", "rejected"],
    default: "draft",
  },
},
{
  timestamps: true,
}
);


export const Blog = mongoose.model("Blog", blogSchema);
