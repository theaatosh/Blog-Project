import { Link } from 'react-router-dom'
import styles from '../BlogCard/BlogCard.module.css'
export const BlogCard = ({blogDetails}) => {

  const {_id,category,blogTitle,blogContent,imageUrl,author,date}=blogDetails
  return (
    <div className={styles.card_container} >
        <div className={styles.img_con}>
            <img src={imageUrl||"lifestyle.png"} alt=""  />
        </div>

        <div className={styles.blog_details}>
            <h3>{category}</h3>
            <h2>{blogTitle}</h2>
            <p>{blogContent?.slice(0,200).concat(' ......')}</p>
           
            <div className={styles.lower_con}>
                       <div className={styles.lower_left}>
                       <img src={author?.profileImage||'/user.png'} alt="profile image" width='30px'/>
                       <div className={styles.profile_details}>
                       <h3>{author?.name}</h3>
                       <p>{date}</p>
                       </div>
           
                       </div>
           
                       <div className={styles.lower_right}>
                        <Link to={`/blog/${_id}`}><button className={styles.lower_btn}>Read more</button></Link>
                       </div>
                     </div>
        </div>
    </div>
  )
}

