import "./BlogReviewCard.Module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const BlogReviewCard = ({
  id,
  category,
  title,
  description,
  image,
  getblogs,
}) => {
  const Navigate = useNavigate();

  async function approveBlog() {
    console.log("Approving blog with ID:", id);
    try {
      const res = await axios.patch(
        `http://localhost:5010/admin/blog/approve/${id}`
      );
      if (res.status === 200) {
        alert("Blog approved successfully");
        getblogs();
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
        alert("Blog rejected successfully");
        getblogs();
      }
    } catch (err) {
      console.log(err);
    }
  }
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
          <button className="approve-btn" onClick={approveBlog}>
            Approve
          </button>
          <Link to={`/admin/adminreviewpage/${id}`}>
            <button className="review-btn">Review</button>
          </Link>
          <button className="deletes-btn" onClick={rejectBlog}>
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogReviewCard;
