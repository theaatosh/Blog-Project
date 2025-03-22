import { useContext, useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import styles from "./SingleBlog.module.css";
import { storeContext } from "../../context/StoreContext";
import axios from 'axios'
import {useParams} from 'react-router-dom'

const SingleBlog = () => {
  const{url}=useContext(storeContext);
 const {id} =useParams();
 
  const [singleBlog, setSingleBlog] = useState(null)
    

  const fetchSingleBlog=async()=>{
    try{

      const res=await axios.get(`${url}/blog/full/${id}`);
      
      setSingleBlog(res.data.blog)
    }catch(err){
      console.log(err.response.message.data);
      
    }
  }
  useEffect(()=>{
   fetchSingleBlog();

  },[])

  return (
    <div className={styles.outer_container}>
      <div className={styles.inner_container}>
        <h2>{singleBlog?.blogTitle}</h2>
        <div className={styles.author_con}>
          <div className={styles.author_left}>
            <img src={singleBlog?.authorImage||'/user.png'} alt="author_image" />
            <div className={styles.profile_details}>
              <h3>{singleBlog?.authorName}</h3>
              <p>{singleBlog?.createdAt}</p>
            </div>
          </div>

          <div className={styles.author_right}>
            <button className={styles.author_btn}>Follow</button>
          </div>
        </div>
        <div className={styles.image_container}>
            <img src={singleBlog?.imageUrl} alt="blog_image" />
        </div>

        <div className={styles.blog_details}>
            <h3>{singleBlog?.category}</h3>
            <p>{singleBlog?.blogContent}</p>

            <div className={styles.review_container}>
                <h3>Review</h3>
                <div className={styles.input_container}>
                <input type="text" placeholder="Add your review" />
                <IoSend className={styles.send_icon}/>

                </div>
            </div>
        </div>
        

      </div>
    </div>
  );
};

export default SingleBlog;
