import { Link } from "react-router-dom";
import styles from "../BlogCard/BlogCard.module.css";
export const BlogCard = ({ blogDetails }) => {
  const { id, category, title, description, image, author, date } = blogDetails;
  return (
    <div className={styles.card_container}>
      <div className={styles.img_con}>
        <img src="lifestyle.png" alt="" />
      </div>

      <div className={styles.blog_details}>
        <h3>{category}</h3>
        <h2>{title}</h2>
        <p>{description?.slice(0, 200).concat(" ......")}</p>

        <div className={styles.lower_con}>
          <div className={styles.lower_left}>
            <img src={author?.profileImage} alt="profile image" width="50px" />
            <div className={styles.profile_details}>
              <h3>{author?.name}</h3>
              <p>{date}</p>
            </div>
          </div>

          <div className={styles.lower_right}>
            <Link to={`/blog/:${id}`}>
              <button className={styles.lower_btn}>Read more</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
