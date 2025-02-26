import styles from '../Hero/Hero.module.css'

export const Hero = () => {
  return (
    <div className={styles.hero_container}>
        <div className={styles.layer_container}>

    <div className={styles.inner_container}>
        <h2 className={styles.heading}>"Unleash Ideas, Explore Stories, and Share Knowledge!"</h2>

        <p className={styles.para}>Join a community of passionate writers and curious readers. Discover insightful blogs, trending topics, and expert opinions—all in one place</p>

        <div className={styles.btn_container}>
            <button className={styles.btn1}>Start Reading</button>
            <button className={styles.btn2}>Write a Blog</button>
        </div>
    </div>
        </div>
    </div>
  )
}

