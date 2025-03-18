import { useState } from 'react';
import { BlogCard } from '../../components/BlogCard/BlogCard';
import styles from './SearchBlog.module.css'
import { IoIosSearch } from "react-icons/io";
export const SearchBlog = () => {
  const [blogData,setBlogData] = useState([
    {
      id: 1,
      category: "Lifestyle",
      title: "The Art of Living: Simple Habits for a Better Lifestyle",
      description:
        "A good lifestyle isn’t just about luxury or social status—it’s about balance, well-being, and fulfillment. In today’s fast-paced world, adopting healthy habits, staying mindful, and finding joy in small moments can transform your life. Whether it’s self-care, productivity, or personal growth, building the right lifestyle is all about making conscious choices every day.",
      image: "lifestyle.png",
      author: {
        name: "Kelly Paul",
        profileImage: "profile.png",
      },
      date: "25th January, 2025",
    },
      {
      id: 2,
      category: "Health & Wellness",
      title: "Mindful Eating: A Guide to Better Health",
      description:
        "Mindful eating is not just about what you eat but how you eat. It helps you enjoy meals, control portions, and develop a healthy relationship with food. Learn simple strategies to practice mindful eating and improve your overall well-being.",
      image: "health.png",
      author: {
        name: "Jessica Brown",
        profileImage: "profile.png",
      },
      date: "10th February, 2025",
    },
    {
      id: 3,
      category: "Productivity",
      title: "Time Management Tips for a More Efficient Life",
      description:
        "Managing time effectively is key to achieving success and balance. From setting priorities to using productivity tools, explore practical tips that can help you stay organized and make the most of your day.",
      image: "productivity.png",
      author: {
        name: "David Miller",
        profileImage: "profile.png",
      },
      date: "5th March, 2025",
    },
  ])
  
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

        <div className={styles.blog_showing}>
        <div className={styles.left_img_con}>
          <img src="fashion.png" alt="" className={styles.blog_img}/>
        </div>

        <div className={styles.right_con}>
          <h2>The Ever-Changing World of Fashion: Trends, Style, and Personal Expression</h2>
          <p>Fashion is more than just clothing; it’s a form of self-expression, a way to tell the world who you are without saying a word. From timeless classics to ever-evolving trends, fashion has a unique way of shaping cultures and reflecting society’s values. Whether you love streetwear, high fashion, or minimalist aesthetics, there’s something for everyone in the fashion world. Fashion is an art that allows individuals to express their personality, mood, and creativity.</p>
          <div className={styles.lower_con}>
            <div className={styles.lower_left}>
            <img src="profile.png" alt="" width='50px' className={styles.profile_img}/>
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

        </div>
        <div className={styles.blog_list}>
          {
            blogData?.map((blog,index)=>{
              return(
                <BlogCard key={blog?.id} blogDetails={blog}/>
              )
            })
          }
        </div>
    </div>
  )
}

