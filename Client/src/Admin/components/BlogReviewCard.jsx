import React from "react";
import "./BlogReviewCard.Module.css";
import { useNavigate } from "react-router-dom";

const BlogReviewCard = ({ category, title, description, image }) => {
  const navigate = useNavigate();

  const handleReviewClick = () => {
    // Navigate to the review page and pass the blog details as state
    navigate("/admin/adminreviewpage", {
      state: { category, title, description, image },
    });
  };
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
          <button className="approve-btn">Approve</button>
          <button className="review-btn" onClick={handleReviewClick}>
            Review
          </button>
          <button className="deletes-btn">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default BlogReviewCard;
