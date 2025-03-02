import { Blog } from "../model/createBlog.js";
export const createBlog = async (req, res) => {
  const { blogTitle, authorName, blogContent, category } = req.body;
  const imageUrl = req.file?.path;
  console.log(req.body);
  if (!blogTitle || !authorName || !blogContent || !category || !imageUrl) {
    return res.status(400).json({ message: "please fill all fields" });
  }
  try {
    const newBlog = new Blog({
      blogTitle: blogTitle,
      authorName: authorName,
      blogContent: blogContent,
      category: category,
      imageUrl: imageUrl,
    });
    await newBlog.save();
    return res.status(201).json({ message: "blog created sucessfully" });
  } catch (err) {
    console.log(err);
  }
};
