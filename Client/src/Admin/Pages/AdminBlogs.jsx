import { useEffect, useState } from "react";
import "../Styles/AdminBlogs.css";
import BlogReviewCard from "../components/BlogReviewCard";

import axios from "axios";
const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  async function getblogs() {
    const res = await axios.get("http://localhost:5010/admin/blog");
    console.log("Response from server:", res.data.blogs);
    if (res.status === 200) {
      setBlogs(res.data.blogs);
    } else {
      console.error("Error fetching blogs:", res.data.message);
    }
  }
  // console.log("Blogs State:", blogs);
  useEffect(() => {
    getblogs();
  }, []);

  return (
    <div className="blog-list">
      <h1 className="blog-list-title">Blogs</h1>
      <div className="blogdisplay">
        <div className="blog-grid">
          {blogs && Array.isArray(blogs) && blogs.length > 0 ? (
            blogs.map((blog) => {
              console.log("Blog Data:", blog._id, blog.blogContent); // Debugging
              return (
                <BlogReviewCard
                  key={blog._id}
                  id={blog._id}
                  category={blog.category}
                  title={blog.blogTitle}
                  description={blog.blogContent}
                  image={blog.imageUrl}
                  getblogs={getblogs}
                />
              );
            })
          ) : (
            <p>No blogs available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBlogs;
