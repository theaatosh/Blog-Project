import { use, useContext, useEffect, useState } from 'react';
import { BlogCard } from '../../components/BlogCard/BlogCard';
import styles from './Blogs.module.css';
import { motion } from 'framer-motion';
import axios from 'axios';
import { storeContext } from '../../context/StoreContext';

// Sample blog data (replace with your actual data source)
const blogData = [
  { _id: "1", category: "Fashion", blogTitle: "Top 10 Fashion Trends for 2025", blogContent: "Explore the latest fashion trends that will dominate 2025 with bold colors and unique styles...", imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b", author: { name: "Emma Carter", profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330" }, date: "2025-03-01" },
  { _id: "2", category: "Tech", blogTitle: "AI Revolution Unveiled", blogContent: "Artificial Intelligence is transforming industries. Here’s what you need to know...", imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c", author: { name: "Liam Hayes", profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e" }, date: "2025-02-15" },
  { _id: "3", category: "Lifestyle", blogTitle: "Minimalist Living 101", blogContent: "Learn how to declutter your life and embrace minimalism with these simple steps...", imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c", author: { name: "Sophia Patel", profileImage: "https://images.unsplash.com/photo-1517841902196-3eabf25f45e8" }, date: "2025-03-10" },
  { _id: "4", category: "Travel", blogTitle: "Hidden Gems of Europe", blogContent: "Discover lesser-known destinations in Europe that offer breathtaking views...", imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470", author: { name: "Emma Carter", profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330" }, date: "2025-03-05" },
  { _id: "5", category: "Entertainment", blogTitle: "Best Movies of the Year", blogContent: "A roundup of the must-watch movies of 2025 that you can’t miss...", imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819", author: { name: "Liam Hayes", profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e" }, date: "2025-03-20" },
];




const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const {url}=useContext(storeContext);
    const [blogData,setBlogData]=useState([]);
  const categories = ["All", "Fashion", "Tech", "Lifestyle", "Travel", "Entertainment"];
//   const blogData = selectedCategory === "All" 
//     ? blogData 
//     : blogData.filter(blog => blog.category === selectedCategory);

    const fetchBlogsData=async()=>{
    try{
        const res=await axios.get(`${url}/blog/${selectedCategory}`);
        console.log(res);
        
        setBlogData(res.data.blogs)
    }catch(err){
        console.log(err.response.data.message);
        
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
          {categories.map(category => (
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
        {blogData.length > 0 ? (
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