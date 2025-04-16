import React from "react";
import "../Styles/AdminReviewPage.css";
import travelImg from "/travel.jpeg";
import profile from "/profile.png";

const AdminReviewPage = () => {
  const blogData = [
    {
      category: "TRAVEL",
      title:
        "Wanderlust Chronicles: Exploring the World, One Destination at a Time",
      description:
        "Travel isn’t just about visiting new places; it’s about experiencing different cultures, meeting new people, and creating memories that last a lifetime. Whether you’re a solo traveler, an adventure seeker, or a luxury enthusiast, every journey has something unique to offer. In this blog we’ll dive into the beauty of travel, must-visit destinations, travel tips, and more.",
      image: travelImg,
      author: {
        name: "Anthony Mackie",
        image: profile,
      },
      publishDate: "20th January, 2025",
    },
  ];

  return (
    <div className="admin-review-container">
      <h2>Blog Review</h2>
      {blogData.map((blog, index) => (
        <div className="review-blog-card" key={index}>
          <img src={blog.image} alt="Blog" className="review-blog-image" />
          <div className="review-blog-content">
            <span className="category">{blog.category}</span>
            <h3>{blog.title}</h3>
            <p>{blog.description}</p>
            <div className="author-section">
              <img
                src={blog.author.image}
                alt="Author"
                className="author-image"
              />
              <div className="author-details">
                <span className="author-name">{blog.author.name}</span>
                <span className="publish-date">{blog.publishDate}</span>
              </div>
            </div>
            <button className="decline-button">Decline</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminReviewPage;
