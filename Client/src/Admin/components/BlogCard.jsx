import React from "react";
import "./BlogCard.Module.css";

const BlogCard = ({ category, title, description, image }) => {
  return (
    <div className="blog-card">
      <div
        className="blog-image"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="blog-content">
        <span className="blog-category">{category}</span>
        <h3 className="blog-title">{title}</h3>
        <p className="blog-description">{description}</p>
        <div className="blog-actions">
          <button className="review-btn">Review</button>
          <button className="approve-btn">Approve</button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
