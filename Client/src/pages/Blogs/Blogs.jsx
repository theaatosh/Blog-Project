import {  useContext, useEffect, useState } from 'react';
import { BlogCard } from '../../components/BlogCard/BlogCard';
import styles from './Blogs.module.css';
import { motion } from 'framer-motion';
import axios from 'axios';
import { storeContext } from '../../context/StoreContext';
import Loading from '../../components/Loading';


const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const {url}=useContext(storeContext);
    const [blogData,setBlogData]=useState([]);
    const [isLoading,setIsLoading]=useState(false);
  const categories = ["All", "Fashion", "Tech", "Lifestyle", "Travel", "Entertainment"];
//   const blogData = selectedCategory === "All" 
//     ? blogData 
//     : blogData.filter(blog => blog.category === selectedCategory);

    const fetchBlogsData=async()=>{
    try{
      setIsLoading(true);
        const res=await axios.get(`${url}/blog/fetch/${selectedCategory}`);
        console.log(res)
        setBlogData(res.data.blogs)
    }catch(err){
        console.log(err.response.data.message);
        
        
    }
    finally{
        setIsLoading(false);
    }
    }

    useEffect(()=>{
      fetchBlogsData();
    },[selectedCategory])

  return (
    <div className={styles.blogs_page}>
      <motion.section 
        className={styles.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Our Blog Collection</h1>
        <p>Discover stories, insights, and tips from our passionate writers</p>
      </motion.section>

      <motion.nav 
        className={styles.category_nav}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className={styles.category_wrapper}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.category_item} ${selectedCategory === category ? styles.active : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.nav>

      <motion.div 
        className={styles.blogs_container}
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {isLoading ?  <div className={styles.loading}><Loading/></div> : blogData.length > 0 ? (
          blogData.map(blog => (
            <motion.div
              key={blog._id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <BlogCard blogDetails={blog} />
            </motion.div>
          ))
        ) : (
          <div className={styles.no_results}>
            <h3>No Blogs Found</h3>
            <p>Check back later for {selectedCategory} content!</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Blogs;