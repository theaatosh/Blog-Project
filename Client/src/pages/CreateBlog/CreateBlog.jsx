import { useContext, useState } from 'react'
import styles from './CreateBlog.module.css'
import axios from 'axios'
import { storeContext } from '../../context/StoreContext'
const CreateBlog = () => {
const {url}=useContext(storeContext)
    const [formData,setFormData]=useState({
        blogTitle:"",
        authorName:"",
        blogContent:"",
        category:"",
        image:""
    })

    const handleOnChange=(e)=>{
        const{name,value,type,files}=e.target;
        console.log(name,value);
        

        setFormData((prev)=>(
            {...prev,[name]: type==="file"?files[0]:value}
        ))
        
    }
    console.log(formData);
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append("blogTitle",formData.blogTitle)
        formData.append("authorName",formData.authorName)
        formData.append("blogContent",formData.blogContent)
        formData.append("category",formData.category)
        formData.append("image",formData.image)

        try{
            const res=await axios.post(`${url}/createBlog`);
            console.log(res);
            
        }catch(err){
            console.log(err.response.data.message);
            
        }
    }

  return (
    <div className={styles.outer_container}>
        <section className={styles.inner_container}>
            <h1>Create a Blog</h1>
            <div className={styles.form_container}>
            <form onSubmit={handleSubmit} className={styles.inner_form_container}>
                <div className={styles.input_container}>
                    <label htmlFor="blog_title">
                        Blog Title
                    </label>
                    <input type="text" id="blog_title" placeholder="Enter blog title" name='blogTitle' onChange={handleOnChange}/>
                </div>
                <div className={styles.input_container}>
                    <label htmlFor="author_name">
                        Author Name
                    </label>
                    <input type="text" id="author_name" placeholder="Enter author name" name='authorName' onChange={handleOnChange}/>
                </div>
                <div className={styles.input_container}>
                    <label htmlFor="blog_content">
                        Blog Content
                    </label>
                   <textarea  id="blog_content" placeholder='Write a blog here' name='blogContent' onChange={handleOnChange} ></textarea>
                </div>
                <div className={styles.input_container}>
                    <label htmlFor="category">Category</label>
                    <select name="category" id="category" onChange={handleOnChange}>
                        <option value="">Select a category</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Travel">Travel</option>
                        <option value="Entertainment">Entertainment</option>
                    </select>
                </div>

                <div className={styles.input_container}>
                    <label htmlFor="image">Upload Image</label>
                    <input type="file" id='image' className='file_input' name='image' onChange={handleOnChange}/>

                </div>
                <button type='submit' >Publish Blog</button>
            </form>
            </div>
        </section>
    </div>
  )
}

export default CreateBlog