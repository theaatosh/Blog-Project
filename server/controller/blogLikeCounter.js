import { Blog } from "../model/createBlog.js";
export const blogLikeCounter = async (req, res) => {
  try {
    
    const { id: blogId } = req.params; 
    const userId = req.user._id; 

    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    
    if (typeof blog.blogLikedCounter !== "number") {
      blog.blogLikedCounter = 0; 
    }

    const isLiked = blog.blogLikedUser.includes(userId);

    if (isLiked) {
      
      blog.blogLikedUser = blog.blogLikedUser.filter(
        (id) => id.toString() !== userId.toString()
      );
      blog.blogLikedCounter = Math.max(0, blog.blogLikedCounter - 1); 
    } else {
      
      blog.blogLikedUser.push(userId);
      blog.blogLikedCounter += 1;
    }

    await blog.save();

    res.json({
      success: true,
      isLiked: !isLiked,
      likeCount: blog.blogLikedCounter,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
