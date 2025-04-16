import { Link } from "react-router-dom";
import styles from "./BlogCard.module.css";
import { FaHeart } from "react-icons/fa";

export const BlogCard = ({ blogDetails }) => {
  const { _id, category, title, blogContent, image, author, date, blogLikedCounter } = blogDetails;

  // Estimate reading time (assuming 200 words per minute)
  const wordsPerMinute = 200;
  const wordCount = blogContent?.split(" ").length || 0;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  // Category color mapping
  const categoryColors = {
    Fashion: { bg_color: "#FCE6F2", color: "rgb(157, 54, 156)" },
    Tech: { bg_color: "rgb(219, 235, 255)", color: "rgb(31, 125, 215)" },
    Entertainment: { bg_color: "rgb(219, 235, 255)", color: "rgb(31, 125, 215)" },
    Health: { bg_color: "#FFF4E6", color: "#A54D0E" }, // Adjusted for better contrast
    Travel: { bg_color: "#DCFDE6", color: "#166534" },
  };

  const categoryBgColor = categoryColors[category]?.bg_color || "#f0f0f0"; // Fallback color
  const textColor = categoryColors[category]?.color || "#333"; // Fallback text color

  return (
    <div className={styles.card_container}>
      <div className={styles.img_con}>
        <img src={image || "lifestyle.png"} alt={title} />
      </div>

      <div className={styles.blog_details}>
        <span
          className={styles.category_tag}
          style={{ backgroundColor: categoryBgColor, color: textColor }}
        >
          {category}
        </span>
        <h2 className={styles.blog_title}>{title}</h2>
        <p className={styles.blog_excerpt}>
          {blogContent?.slice(0, 150).concat("...")}
        </p>

        <div className={styles.meta_info}>
          <span className={styles.reading_time}>{readingTime} min read</span>
          <span className={styles.likes}>
            <FaHeart className={styles.heart_icon} />
            <span>{blogLikedCounter >= 0 ? blogLikedCounter : 0}</span>
          </span>
        </div>

        <div className={styles.lower_con}>
          <div className={styles.lower_left}>
            <img
              src={author?.profileImage || "/user.png"}
              alt="profile"
              className={styles.author_img}
            />
            <div className={styles.profile_details}>
              <h3>{author?.name || "Anonymous"}</h3>
              <p>{new Date(date).toLocaleDateString()}</p>
            </div>
          </div>

          <div className={styles.lower_right}>
            <Link to={`/blog/${_id}`}> {/* Fixed :${_id} to ${_id} */}
              <button className={styles.read_more_btn}>Read More</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};