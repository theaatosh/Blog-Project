import React, { useState } from "react";
import "../Styles/AdminBlogs.css";
import BlogReviewCard from "../components/BlogReviewCard";
import travelImg from "/travel.jpeg";
import singleBlogImg from "/singleBlog.png";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([
    {
      category: "Travel",
      title:
        "Wanderlust Chronicles: Exploring the World, One Destination at a Time",
      description:
        "Travel isn't just about visiting new places; it's about creating memories that last a lifetime. Whether you're a history buff, an adventure seeker, or a luxury traveler, well dive into the beauty of travel, must-visit destinations.",
      image: travelImg,
    },
    {
      category: "Travel",
      title:
        "Wanderlust Chronicles: Exploring the World, One Destination at a Time",
      description:
        "Travel isn't just about visiting new places; it's about creating memories that last a lifetime. Whether you're a history buff, an adventure seeker, or a luxury traveler, well dive into the beauty of travel, must-visit destinations.",
      image: singleBlogImg,
    },
  ]);

  // Debug the blogs state before rendering
  console.log("Blogs State:", blogs);

  return (
    <div className="blog-list">
      <h1 className="blog-list-title">Blogs</h1>
      <div className="blogdisplay">
        <div className="blog-grid">
          {blogs && Array.isArray(blogs) ? (
            blogs.map((blog, index) => {
              console.log("Blog Data:", blog); // Debugging
              return (
                <BlogReviewCard
                  key={index}
                  category={blog.category}
                  title={blog.title}
                  description={blog.description}
                  image={blog.image}
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
