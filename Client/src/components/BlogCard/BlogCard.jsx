import styles from '../BlogCard/BlogCard.module.css'
export const BlogCard = () => {
  return (
    <div className={styles.card_container}>
        <div className={styles.img_con}>
            <img src="lifestyle.png" alt="" />
        </div>

        <div className={styles.blog_details}>
            <h3>Lifestyle</h3>
            <h2>The Art of Living: Simple Habits for a Better Lifestyle</h2>
            <p>A good lifestyle isn’t just about luxury or social status—it’s about balance, well-being, and fulfillment. In today’s fast-paced world, adopting healthy habits, staying mindful, and finding joy in small moments can transform your life. Whether it’s self-care, productivity, or personal growth, building the right lifestyle is all about making conscious choices every day.</p>
           
            <div className={styles.lower_con}>
                       <div className={styles.lower_left}>
                       <img src="profile.png" alt="" width='50px'/>
                       <div className={styles.profile_details}>
                       <h3>Kelly Paul</h3>
                       <p>25th january,2025</p>
                       </div>
           
                       </div>
           
                       <div className={styles.lower_right}>
                         <button className={styles.lower_btn}>Read more</button>
                       </div>
                     </div>
        </div>
    </div>
  )
}

