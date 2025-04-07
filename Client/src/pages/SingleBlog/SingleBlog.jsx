import { useContext, useEffect, useState } from "react";
import { IoSend, IoHeart, IoHeartOutline } from "react-icons/io5";
import styles from "./SingleBlog.module.css";
import { storeContext } from "../../context/StoreContext";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SingleBlog = () => {
  const { url, user } = useContext(storeContext);
  const userId = user?._id;
  const { id } = useParams();
  const navigate = useNavigate();

  const [singleBlog, setSingleBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState({});

  // Fetch only blog details (no comments)
  const fetchSingleBlog = async () => {
    try {
      const res = await axios.get(`${url}/blog/full/${id}`);
      setSingleBlog(res?.data?.blog);
    } catch (err) {
      console.error(err.response?.data?.message || "Failed to fetch blog");
    }
  };

  // Fetch comments separately
  const fetchComments = async () => {
    try {
      const res = await axios.get(`${url}/comment/get/${id}`,{withCredentials:true});
      console.log(res);
      
      setComments(res?.data?.comments || []);
    } catch (err) {
      console.error(err.response?.data?.message || "Failed to fetch comments");
    }
  };

  const handleLike = async (blogId) => {
    if (!user) {
      toast.error("Please log in to like the blog!");
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
      toast.success(isLiked ? "Blog liked!" : "Blog unliked!");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to toggle like");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to comment!");
      navigate("/login");
      return;
    }
    if (!commentText.trim()) {
      toast.error("Comment cannot be empty!");
      return;
    }

    try {
      // Add comment via API
      await axios.post(
        `${url}/comment/add/${id}`,
        { commentText },
        { withCredentials: true }
      );
      // Fetch updated comments after adding
      await fetchComments();
      setCommentText("");
      toast.success("Comment added!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add comment");
    }
  };

  const handleReplySubmit = async (commentId) => {
    if (!user) {
      toast.error("Please log in to reply!");
      navigate("/login");
      return;
    }
    const text = replyText[commentId]?.trim();
    if (!text) return;

    try {
      const res = await axios.post(`${url}/blog/comment/${id}/reply`, { commentId, text });
      setComments((prev) =>
        prev.map((c) =>
          c._id === commentId ? { ...c, replies: [...(c.replies || []), res.data.reply] } : c
        )
      );
      setReplyText((prev) => ({ ...prev, [commentId]: "" }));
      toast.success("Reply added!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add reply");
    }
  };

  useEffect(() => {
    fetchSingleBlog(); // Fetch blog only
    fetchComments(); // Fetch comments separately
  }, [id]);

  const isLiked = singleBlog?.blogLikedUser?.includes(userId);

  return (
    <div className={styles.outer_container}>
      <div className={styles.inner_container}>
        <h2>{singleBlog?.blogTitle}</h2>
        <div className={styles.author_con}>
          <div className={styles.author_left}>
            <img
              src={singleBlog?.authorImage || "/user.png"}
              alt="author"
              className={styles.author_img}
            />
            <div className={styles.profile_details}>
              <h3>{singleBlog?.authorName}</h3>
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
            <h3>{singleBlog?.category}</h3>
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

        {/* Separate Comments Container */}
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
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment._id} className={styles.comment}>
                  <div className={styles.comment_header}>
                    <span>{comment.authorName || "Anonymous"}</span>
                    <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p>{comment.text}</p>

                  <div className={styles.reply_section}>
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
                  </div>
                </div>
              ))
            ) : (
              <p>No comments yet. Be the first to comment!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;