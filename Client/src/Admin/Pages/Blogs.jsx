import React from "react";
import "../Styles/Blogs.css";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
  // Sample data for blogs
  const blogs = [
    {
      category: "Travel",
      title:
        "Wanderlust Chronicles: Exploring the World, One Destination at a Time",
      description:
        "Travel isn't just about visiting new places; it's about creating memories that last a lifetime. Whether you're a history buff, an adventure seeker, or a luxury traveler, well dive into the beauty of travel, must-visit destinations.",
      image: "travel.jpeg",
    },
    {
      category: "Travel",
      title:
        "Wanderlust Chronicles: Exploring the World, One Destination at a Time",
      description:
        "Travel isn't just about visiting new places; it's about creating memories that last a lifetime. Whether you're a history buff, an adventure seeker, or a luxury traveler, well dive into the beauty of travel, must-visit destinations.",
      image: "singleBlog.png",
    },
    // Add more blog objects as needed
  ];

  return (
    <div className="blog-list">
      <h1 className="blog-list-title">Blogs</h1>
      <div className="blog-grid">
        {blogs.map((blog, index) => (
          <BlogCard
            key={index}
            category={blog.category}
            title={blog.title}
            description={blog.description}
            image={blog.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
