import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Styles/AdminReviewPage.css";
import axios from "axios";

const AdminReviewPage = () => {
  const [blogData, setBlogData] = useState(null);
  const { id } = useParams();
  const Navigate = useNavigate();
  async function getSingleBlog() {
    try {
      const res = await axios.get(
        `http://localhost:5010/admin/blog/singleBlogReview/${id}`
      );
      if (res.status === 200) {
        console.log("Response from server:", res.data.blog);
        setBlogData(res.data.blog);
        console.log(blogData);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function approveBlog() {
    console.log("Approving blog with ID:", id);
    try {
      const res = await axios.patch(
        `http://localhost:5010/admin/blog/approve/${id}`
      );
      if (res.status === 200) {
        console.log("Blog approved successfully:", res.data.message);
        Navigate("/admin/adminblogs");
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function rejectBlog() {
    console.log("Rejecting blog with ID:", id);
    try {
      const res = await axios.patch(
        `http://localhost:5010/admin/blog/reject/${id}`
      );
      if (res.status === 200) {
        console.log("Blog rejected successfully:", res.data.message);
        Navigate("/admin/adminblogs");
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (id) getSingleBlog();
  }, [id]);

  return (
    <div className="admin-review-container">
      <h2>Blog Review</h2>
      <div className="review-blog-card" key={blogData?._id}>
        <img
          src={blogData?.imageUrl}
          alt="Blog"
          className="review-blog-image"
        />
        <div className="review-blog-content">
          <span className="category">{blogData?.category}</span>
          <h3>{blogData?.blogTitle}</h3>
          <p>{blogData?.blogContent}</p>
          {/* <div className="author-section">
            <img
              src={blogData?.author.image}
              alt="Author"
              className="author-image"
            />
            <div className="author-details">
              <span className="author-name">{blogData.authorName}</span>
              <span className="publish-date">{blogData.createdAt}</span>
            </div>
          </div> */}
          <div className="review-actions">
            <button className="decline-button" onClick={rejectBlog}>
              Decline
            </button>
            <button className="approve-button" onClick={approveBlog}>
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReviewPage;
