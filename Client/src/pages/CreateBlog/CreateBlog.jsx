import { useContext, useRef, useState } from "react";
import styles from "./CreateBlog.module.css";
import axios from "axios";
import { storeContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TiDeleteOutline } from "react-icons/ti";

const CreateBlog = () => {
  const { url } = useContext(storeContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    blogTitle: "",
    authorName: "",
    blogContent: "",
    category: "",
    image: null, // Changed to null for clarity
  });

  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef=useRef(null);
  const handleOnChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      setPreviewImage(file ? URL.createObjectURL(file) : null);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageRemove = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setPreviewImage(null);
    console.log(fileInputRef);
    
    if(fileInputRef?.current){
        fileInputRef.current.value="";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDatas = new FormData();
    formDatas.append("blogTitle", formData.blogTitle);
    formDatas.append("authorName", formData.authorName);
    formDatas.append("blogContent", formData.blogContent);
    formDatas.append("category", formData.category);
    if (formData.image) {
      formDatas.append("image", formData.image);
    }

    try {
      const res = await axios.post(`${url}/createBlog`, formDatas);
      if (res.status === 201) {
        toast.success(res.data.message);
        navigate("/");
        setFormData({
          blogTitle: "",
          authorName: "",
          blogContent: "",
          category: "",
          image: null,
        });
        setPreviewImage(null);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create blog");
    }
  };

  return (
    <div className={styles.outer_container}>
      <section className={styles.inner_container}>
        <h1>Create a Blog</h1>
        <div className={styles.form_container}>
          <form onSubmit={handleSubmit} className={styles.inner_form_container}>
            <div className={styles.input_container}>
              <label htmlFor="blog_title">Blog Title</label>
              <input
                type="text"
                id="blog_title"
                placeholder="Enter blog title"
                name="blogTitle"
                value={formData.blogTitle}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className={styles.input_container}>
              <label htmlFor="author_name">Author Name</label>
              <input
                type="text"
                id="author_name"
                placeholder="Enter author name"
                name="authorName"
                value={formData.authorName}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className={styles.input_container}>
              <label htmlFor="blog_content">Blog Content</label>
              <textarea
                id="blog_content"
                placeholder="Write a blog here"
                name="blogContent"
                value={formData.blogContent}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className={styles.input_container}>
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                value={formData.category}
                onChange={handleOnChange}
                required
              >
                <option value="">Select a category</option>
                <option value="Fashion">Fashion</option>
                <option value="Travel">Travel</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Tech">Tech</option>
                <option value="Lifestyle">Health</option>
              </select>
            </div>

            <div className={styles.input_container}>
              <label htmlFor="image">Upload Image</label>
              {previewImage && (
                <div className={styles.image_preview_container}>
                  <img src={previewImage} alt="Preview" />
                  <button
                    type="button"
                    className={styles.remove_image_btn}
                    onClick={handleImageRemove}
                    title="Remove image"
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              )}
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleOnChange}
                className={styles.file_input}
                ref={fileInputRef}
              />
            </div>

            <button type="submit" className={styles.submit_btn}>
              Publish Blog
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CreateBlog;