import React from "react";
import "./BlogReviewCard.Module.css";

const BlogReviewCard = ({ category, title, description, image }) => {
  console.log(category, title);
  return (
    <div className="blog-card">
      <div className="blog-image">
        <img src={image} alt="Image 1"></img>
      </div>
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

export default BlogReviewCard;
