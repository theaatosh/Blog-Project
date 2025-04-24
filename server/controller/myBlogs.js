import { Blog } from "../model/createBlog.js";
import { v2 as cloudinary } from "cloudinary";



// Helper function to delete an image from Cloudinary
const deleteImage = async (imageUrl) => {
  try {
    if (imageUrl) {
      // Extract public_id from Cloudinary URL (e.g., "blogs/filename")
      const publicId = imageUrl.split("/").slice(-2).join("/").split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }
  } catch (err) {
    console.error("Error deleting image from Cloudinary:", err);
  }
};

// Fetch user's blogs
export const fetchMyBlogs = async (req, res) => {
  const { id: userId } = req.user;

  try {
    const userBlogs = await Blog.find({ createdBy: userId }).populate({
      path: "createdBy",
      select: "fullName photo",
    });
    if (!userBlogs || userBlogs.length === 0) {
      return res.status(404).json({ message: "Blogs not found", data: [] });
    }

    res.status(200).json({ message: "Blogs fetched successfully", data: userBlogs });
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs", error: err.message });
  }
};

// Update a blog
export const editMyBlog = async (req, res) => {
    const { id } = req.params;
    const { blogTitle, blogContent, category } = req.body;
    const userId = req.user.id;
  
    try {
      // Find the blog
      const blog = await Blog.findOne({ _id: id, createdBy: userId });
      if (!blog) {
        return res.status(404).json({ message: "Blog not found or unauthorized" });
      }
  
      // Prepare update data
      const updateData = {
        blogTitle: blogTitle || blog.blogTitle,
        blogContent: blogContent || blog.blogContent,
        category: category || blog.category,
      };
  
      // Handle image upload
      if (req.file) {
        // Upload new image to Cloudinary using multer's buffer
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "InternBlogs", resource_type: "image" },
            (error, result) => {
              if (error) return reject(new Error("Cloudinary upload failed"));
              resolve(result);
            }
          );
          stream.end(req.file.buffer);
        });
  
        // Delete the previous image if it exists
        if (blog.imageUrl) {
          await deleteImage(blog.imageUrl);
        }
  
        // Set new image URL
        updateData.imageUrl = result.secure_url;
      } else if (req.body.imageUrl === "") {
        // If imageUrl is explicitly set to empty, delete the current image
        if (blog.imageUrl) {
          await deleteImage(blog.imageUrl);
        }
        updateData.imageUrl = "";
      }
  
      // Update the blog
      const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      }).populate({ path: "createdBy", select: "fullName photo" });
  
      res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
    } catch (err) {
      console.error("Error updating blog:", err);
      res.status(500).json({ message: "Error updating blog", error: err.message });
    }
  };

// Delete a blog
export const deleteMyBlog = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
  
    try {
      // Find the blog
      const blog = await Blog.findOne({ _id: id, createdBy: userId });
      if (!blog) {
        return res.status(404).json({ message: "Blog not found or unauthorized" });
      }
  
      // Delete the associated image if it exists
      if (blog.imageUrl) {
        await deleteImage(blog.imageUrl);
      }
  
      // Delete the blog
      await Blog.findByIdAndDelete(id);
  
      res.status(200).json({ message: "Blog deleted successfully" });
    } catch (err) {
      console.error("Error deleting blog:", err);
      res.status(500).json({ message: "Error deleting blog", error: err.message });
    }
  };