import {  useContext, useEffect, useState } from 'react';
import { BlogCard } from '../../components/BlogCard/BlogCard';
import styles from './SearchBlog.module.css'
import { IoIosSearch } from "react-icons/io";
import axios from 'axios';
import { storeContext } from '../../context/StoreContext';
export const SearchBlog = () => {
  const [blogData,setBlogData] = useState([]);
const{url}=useContext(storeContext)
  useEffect(() => {
    const fetchBlogs=async()=>{
      try{
        const res=await axios.get(`${url}/blog/`);
        console.log(res);
        setBlogData(res.data.blogs)
        
      }catch(err){
        console.log(err.response.data.message);
        
      }
    }
  
    fetchBlogs()
  }, [url])
  
  
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
                <BlogCard key={blog?._id} blogDetails={blog.blog}/>
              )
            })
          }
        </div>
    </div>
  )
}

