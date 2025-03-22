import { useContext, useEffect, useState } from "react";
import { IoSend, IoHeart, IoHeartOutline } from "react-icons/io5";
import styles from "./SingleBlog.module.css";
import { storeContext } from "../../context/StoreContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const SingleBlog = () => {
  const { url } = useContext(storeContext);
  const { id } = useParams();

  const [singleBlog, setSingleBlog] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState({});
  const [userId] = useState("user123"); // Mock user ID; replace with actual auth

  const fetchSingleBlog = async () => {
    try {
      const res = await axios.get(`${url}/blog/full/${id}`);
      setSingleBlog(res.data.blog);
    } catch (err) {
      console.error(err.response?.data?.message || "Failed to fetch blog");
    }
  };

  const handleLike = async () => {
    try {
      const res = await axios.post(`${url}/blog/like/${id}`, { userId });
      setSingleBlog((prev) => ({
        ...prev,
        blogLikedCounter: res.data.blogLikedCounter,
        blogLikedUser: res.data.blogLikedUser,
      }));
      toast.success("Blog liked!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to like blog");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const res = await axios.post(`${url}/blog/comment/${id}`, {
        userId,
        text: commentText,
      });
      setSingleBlog((prev) => ({
        ...prev,
        comments: [...(prev.comments || []), res.data.comment],
      }));
      setCommentText("");
      toast.success("Comment added!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add comment");
    }
  };

  const handleReplySubmit = async (commentId) => {
    const text = replyText[commentId]?.trim();
    if (!text) return;

    try {
      const res = await axios.post(`${url}/blog/comment/${id}/reply`, {
        userId,
        commentId,
        text,
      });
      setSingleBlog((prev) => ({
        ...prev,
        comments: prev.comments.map((c) =>
          c._id === commentId
            ? { ...c, replies: [...(c.replies || []), res.data.reply] }
            : c
        ),
      }));
      setReplyText((prev) => ({ ...prev, [commentId]: "" }));
      toast.success("Reply added!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add reply");
    }
  };

  useEffect(() => {
    fetchSingleBlog();
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
              onClick={handleLike}
              className={styles.like_btn}
              title={isLiked ? "Unlike" : "Like"}
            >
              {isLiked ? <IoHeart /> : <IoHeartOutline />}{" "}
              {singleBlog?.blogLikedCounter || 0}
            </button>
          </div>
          <p>{singleBlog?.blogContent}</p>

          <div className={styles.comments_section}>
            <h3>Comments ({singleBlog?.comments?.length || 0})</h3>
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
              {singleBlog?.comments?.map((comment) => (
                <div key={comment._id} className={styles.comment}>
                  <div className={styles.comment_header}>
                    <span>{comment.authorName || "Anonymous"}</span>
                    <span>
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
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
                          setReplyText((prev) => ({
                            ...prev,
                            [comment._id]: e.target.value,
                          }))
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
                          <span>
                            {new Date(reply.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p>{reply.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;