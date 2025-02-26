import styles from '../SearchBlog/SearchBlog.module.css'
import { IoIosSearch } from "react-icons/io";
export const SearchBlog = () => {
  return (
    <div className={styles.outer_container}>
        <div className={styles.inner_container}>
        <div className={styles.search_container}>
           <h1>Blog</h1>
        <div className={styles.search_bar_container}>
        <IoIosSearch className={styles.search_icon}/>
            <input type="text" name="" id="" placeholder='Search for blog' className={styles.search_bar}/>
        </div>
        </div>


        <div className={styles.category_filter}>
            <ul>
            <li>All</li>
            <li>Fashion</li>
            <li>Travel</li>
            <li>Lifestyle</li>
            <li>Entertainment</li>
            <li>Technology</li>

            </ul>
        </div>

        </div>
    </div>
  )
}

