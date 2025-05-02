import { Link } from "react-router-dom";
import styles from "./BlogCard.module.css";
import { FaArrowRight } from "react-icons/fa"; // Importing an icon from react-icons

export const BlogCard = ({ blogDetails }) => {
  const { _id, category, blogTitle, blogContent, imageUrl,  createdAt,createdBy } = blogDetails;

  // Estimate reading time (assuming 200 words per minute)
  const wordsPerMinute = 200;
  const wordCount = blogContent?.split(" ").length || 0;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  // Truncate text with ellipsis based on word limit
  const truncateText = (text, maxWords) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  // Soothing category color mapping
  const categoryColors = {
    Fashion: { bg_color: "#F3E8FF", color: "#6B46C1" },
    Tech: { bg_color: "#E6F3FA", color: "#2B6CB0" },
    Entertainment: { bg_color: "#FEF3C7", color: "#D69E2E" },
    Health: { bg_color: "#D1FAE5", color: "#276749" },
    Travel: { bg_color: "#E6FFFA", color: "#319795" },
  };

  const categoryBgColor = categoryColors[category]?.bg_color || "#ECECEC";
  const textColor = categoryColors[category]?.color || "#333333";
console.log(blogDetails);
  return (
    <div className={styles.card_container}>
      <div className={styles.img_con}>
        <img src={imageUrl || "lifestyle.png"} alt={blogTitle} />
      </div>

      <div className={styles.blog_details}>
        <span
          className={styles.category_tag}
          style={{ backgroundColor: categoryBgColor, color: textColor }}
        >
          {category}
        </span>
        <h2 className={styles.blog_title}>{truncateText(blogTitle, 20)}</h2>
        <p className={styles.blog_excerpt}>{truncateText(blogContent, 30)}</p>

        <div className={styles.meta_info}>
          <span className={styles.reading_time}>{readingTime} min read</span>
        </div>

        <div className={styles.lower_con}>
          <div className={styles.lower_left}>
            <img
              src={createdBy?.photo || "/user.png"}
              alt="profile"
              className={styles.author_img}
            />
            <div className={styles.profile_details}>
              <h3>{createdBy?.fullName || "Anonymous"}</h3>
              <p>{new Date(createdAt).toISOString().split('T')[0]}</p>
            </div>
          </div>

          <div className={styles.lower_right}>
            <Link to={`/blog/${_id}`}>
              <button className={styles.read_more_btn}>
                Read More <FaArrowRight className={styles.read_more_icon} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};