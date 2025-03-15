import { useContext, useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import styles from "./SingleBlog.module.css";
import { storeContext } from "../../context/StoreContext";

const SingleBlog = () => {
  const{url}=useContext(storeContext)
  const [singleBlog, setSingleBlog] = useState({
    title: "The Future of Web Development",
    author: "John Doe",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit sapiente nihil earum natus recusandae quae voluptates iusto laboriosam, fuga dolorem accusantium ex molestias facilis assumenda iure doloremque modi vero quos.",
      
    category: "Technology",
    authorImage: "/user.png",
    image:
      "/singleBlog.png",
    publishedAt: "25th january,2025",
  });

  const fetchSingleBlog=async()=>{
    try{

      const res=await axios.get(`${url}/api halne`);
      setSingleBlog(res.data)
    }catch(err){
      console.log(err.response.message.data);
      
    }
  }
  useEffect(()=>{
   fetchSingleBlog()

  },[])

  return (
    <div className={styles.outer_container}>
      <div className={styles.inner_container}>
        <h2>{singleBlog?.title}</h2>
        <div className={styles.author_con}>
          <div className={styles.author_left}>
            <img src={singleBlog?.authorImage} alt="author_image" width="50px" />
            <div className={styles.profile_details}>
              <h3>{singleBlog?.author}</h3>
              <p>{singleBlog?.publishedAt}</p>
            </div>
          </div>

          <div className={styles.author_right}>
            <button className={styles.author_btn}>Follow</button>
          </div>
        </div>
        <div className={styles.image_container}>
            <img src={singleBlog?.image} alt="blog_image" />
        </div>

        <div className={styles.blog_details}>
            <h3>{singleBlog?.category}</h3>
            <p>{singleBlog?.content}</p>

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
