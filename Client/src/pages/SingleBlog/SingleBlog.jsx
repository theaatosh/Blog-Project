import { useContext, useEffect, useState } from "react";
import { IoSend, IoHeart, IoHeartOutline } from "react-icons/io5";
import styles from "./SingleBlog.module.css";
import { storeContext } from "../../context/StoreContext";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import showAlert from "../../utils/sweetAlert";

const SingleBlog = () => {
  const { url, user } = useContext(storeContext);
  const userId = user?._id;
  const { id } = useParams();
  const navigate = useNavigate();

  const [singleBlog, setSingleBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);

  // Category colors
  const categoryColors = {
    Fashion: { bg_color: "#F3E8FF", color: "#6B46C1" },
    Tech: { bg_color: "#E6F3FA", color: "#2B6CB0" },
    Entertainment: { bg_color: "#FEF3C7", color: "#D69E2E" },
    Health: { bg_color: "#D1FAE5", color: "#276749" },
    Travel: { bg_color: "#E6FFFA", color: "#319795" },
  };

  // Fetch only blog details (no comments)
  const fetchSingleBlog = async () => {
    try {
      const res = await axios.get(`${url}/blog/full/${id}`);
      console.log(res)
      setSingleBlog(res?.data?.blog);
    } catch (err) {
      console.error(err.response?.data?.message || "Failed to fetch blog");
    }
  };

  // Fetch comments separately
  const fetchComments = async () => {
    try {
      const res = await axios.get(`${url}/comment/get/${id}`, { withCredentials: true });
      setComments(res?.data?.data || []);
    } catch (err) {
      console.error(err.response?.data?.message || "Failed to fetch comments");
    }
  };

  const handleLike = async (blogId) => {
    if (!user) {
      showAlert("Error", "Please log in to like the blog!", "error");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(`${url}/blog/like/${blogId}`, {}, { withCredentials: true });
      const { isLiked, likeCount } = res.data;

      setSingleBlog((prev) => ({
        ...prev,
        blogLikedUser: isLiked
          ? [...(prev.blogLikedUser || []), userId]
          : prev.blogLikedUser.filter((id) => id !== userId),
        blogLikedCounter: likeCount,
      }));
    } catch (err) {
      showAlert("Error", err?.response?.data?.message || "Failed to toggle like", "error");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      showAlert("Error", "Please log in to comment!", "error");
      navigate("/login");
      return;
    }
    if (!commentText.trim()) {
      showAlert("Error", "Comment cannot be empty!", "error");
      return;
    }

    try {
      await axios.post(
        `${url}/comment/add/${id}`,
        { commentText },
        { withCredentials: true }
      );
      await fetchComments();
      setCommentText("");
    } catch (err) {
      showAlert("Error", err.response?.data?.message || "Failed to add comment", "error");
    }
  };

  useEffect(() => {
    fetchSingleBlog();
    fetchComments();
  }, [id]);

  const isLiked = singleBlog?.blogLikedUser?.includes(userId);
  const categoryStyle = singleBlog?.category
    ? {
        backgroundColor: categoryColors[singleBlog.category]?.bg_color || "#f1f2f6",
        color: categoryColors[singleBlog.category]?.color || "#636e72",
      }
    : {};

  // Determine comments to display
  const displayedComments = showAllComments ? comments : comments.slice(0, 2);

  return (
    <div className={styles.outer_container}>
      <div className={styles.inner_container}>
        <h2>{singleBlog?.blogTitle}</h2>
        <div className={styles.author_con}>
          <div className={styles.author_left}>
            <img
              src={singleBlog?.createdBy?.photo || "/user.png"}
              alt="author"
              className={styles.author_img}
            />
            <div className={styles.profile_details}>
              <h3>{singleBlog?.createdBy?.fullName}</h3>
              <p>{new Date(singleBlog?.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className={styles.author_right}>
            <button className={styles.author_btn}>Follow</button>
          </div>
        </div>

        <div className={styles.image_container}>
          <img src={singleBlog?.imageUrl} alt={singleBlog?.blogTitle} />
        </div>

        <div className={styles.blog_details}>
          <div className={styles.meta_info}>
            <h3 style={categoryStyle}>{singleBlog?.category}</h3>
            <button
              onClick={() => handleLike(singleBlog?._id)}
              className={styles.like_btn}
              title={isLiked ? "Unlike" : "Like"}
            >
              {isLiked ? <IoHeart color="red" /> : <IoHeartOutline />}{" "}
              {singleBlog?.blogLikedCounter || 0}
            </button>
          </div>
          <p>{singleBlog?.blogContent}</p>
        </div>

        {/* Comments Container */}
        <div className={styles.comments_container}>
          <h3>Comments ({comments.length})</h3>
          <form onSubmit={handleCommentSubmit} className={styles.comment_form}>
            <input
              type="text"
              placeholder="Add your comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button type="submit" className={styles.send_btn}>
              <IoSend />
            </button>
          </form>

          <div className={styles.comments_list}>
            {displayedComments.length > 0 ? (
              displayedComments.map((comment) => (
                <div key={comment._id} className={styles.comment}>
                  <div className={styles.comment_header}>
                    <span>{comment?.userId?.fullName || "Anonymous"}</span>
                    <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p>{comment.commentText}</p>
                  {/* Commenting out reply section */}
                  {/* <div className={styles.reply_section}>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleReplySubmit(comment._id);
                      }}
                      className={styles.reply_form}
                    >
                      <input
                        type="text"
                        placeholder="Reply to this comment"
                        value={replyText[comment._id] || ""}
                        onChange={(e) =>
                          setReplyText((prev) => ({ ...prev, [comment._id]: e.target.value }))
                        }
                      />
                      <button type="submit" className={styles.reply_btn}>
                        <IoSend />
                      </button>
                    </form>

                    {comment.replies?.map((reply) => (
                      <div key={reply._id} className={styles.reply}>
                        <div className={styles.reply_header}>
                          <span>{reply.authorName || "Anonymous"}</span>
                          <span>{new Date(reply.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p>{reply.text}</p>
                      </div>
                    ))}
                  </div> */}
                </div>
              ))
            ) : (
              <p>No comments yet. Be the first to comment!</p>
            )}
          </div>

          {comments.length > 2 && (
            <button
              className={styles.toggle_comments_btn}
              onClick={() => setShowAllComments(!showAllComments)}
            >
              {showAllComments ? "Show Less" : "View All Comments"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;