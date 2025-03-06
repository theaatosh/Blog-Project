import styles from './CreateBlog.module.css'
const CreateBlog = () => {
  return (
    <div className={styles.outer_container}>
        <section className={styles.inner_container}>
            <h1>Create a Blog</h1>
            <div className={styles.form_container}>
            <form action="" className={styles.inner_form_container}>
                <div className={styles.input_container}>
                    <label htmlFor="blog_title">
                        Blog Title
                    </label>
                    <input type="text" id="blog_title" placeholder="Enter blog title"/>
                </div>
                <div className={styles.input_container}>
                    <label htmlFor="author_name">
                        Author Name
                    </label>
                    <input type="text" id="author_name" placeholder="Enter author name"/>
                </div>
                <div className={styles.input_container}>
                    <label htmlFor="blog_content">
                        Blog Content
                    </label>
                   <textarea name="" id="blog_content" placeholder='Write a blog here'></textarea>
                </div>
                <div className={styles.input_container}>
                    <label htmlFor="category">Category</label>
                    <select name="category" id="category">
                        <option value="">Select a category</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Travel">Travel</option>
                        <option value="Entertainment">Entertainment</option>
                    </select>
                </div>

                <div className={styles.input_container}>
                    <label htmlFor="image">Upload Image</label>
                    <input type="file" id='image' className='file_input'/>

                </div>
                <button type='submit' >Publish Blog</button>
            </form>
            </div>
        </section>
    </div>
  )
}

export default CreateBlog