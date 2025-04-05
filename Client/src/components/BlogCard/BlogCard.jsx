import { Link } from "react-router-dom";
import styles from "./BlogCard.module.css";
import { FaHeart } from "react-icons/fa"; // Importing a heart icon for likes

export const BlogCard = ({ blogDetails }) => {
  const { _id, category, title, blogContent, imageUrl, author, date, likes } =
    blogDetails;

  // Estimate reading time (assuming 200 words per minute)
  const wordsPerMinute = 200;
  const wordCount = blogContent?.split(" ").length || 0;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  // Category color mapping
  const categoryColors = {
    Fashion: { bg_color: "#FCE6F2", color: "rgb(157,54,156)" },
    Tech: { bg_color: "rgb(219,235,255)", color: "rgb(31,125,215)" },
    Entertainment: { bg_color: "rgb(219,235,255)", color: "rgb(31,125,215)" },
    Health: { bg_color: "#A54D0E", color: "#6B27AB" },
    Travel: { bg_color: "#DCFDE6", color: "#166534" },
  };

  const categoryBgColor = categoryColors[category]?.bg_color;
  const textColor = categoryColors[category]?.color;

  return (
    <div className={styles.card_container}>
      <div className={styles.img_con}>
        <img src="lifestyle.png" alt="" />
      </div>

      <div className={styles.blog_details}>
        <h3>{category}</h3>
        <h2>{title}</h2>
        <p>{blogContent?.slice(0, 200).concat(" ......")}</p>

        <div className={styles.lower_con}>
          <div className={styles.lower_left}>
            <img src={author?.profileImage} alt="profile image" width="50px" />
            <div className={styles.profile_details}>
              <h3>{author?.name}</h3>
              <p>{date}</p>
            </div>
          </div>

          <div className={styles.lower_right}>
            <Link to={`/blog/:${_id}`}>
              <button className={styles.lower_btn}>Read more</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
