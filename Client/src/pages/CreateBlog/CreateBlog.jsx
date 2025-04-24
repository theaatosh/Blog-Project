import { useContext, useRef, useState } from "react";
import styles from "./CreateBlog.module.css";
import axios from "axios";
import { storeContext } from "../../context/StoreContext";
import Swal from "sweetalert2"; // Import SweetAlert2
import { useNavigate } from "react-router-dom";
import { TiDeleteOutline } from "react-icons/ti";
import { motion } from "framer-motion";

const CreateBlog = () => {
  const { url } = useContext(storeContext);
  const navigate = useNavigate();
  const[isPublishing,setIsPublishing]=useState(false);
  const [formData, setFormData] = useState({
    blogTitle: "",
    authorName: "",
    blogContent: "",
    category: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

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
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      Swal.fire({
        title: "Invalid File",
        text: "Please drop an image file",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#ff6b6b",
      });
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
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
      setIsPublishing(true);
      const res = await axios.post(`${url}/createBlog`, formDatas,{withCredentials:true});
      if (res.status === 201) {
        await Swal.fire({
          title: "Blog Published!",
          text: res.data.message || "Your blog has been successfully created!",
          icon: "success",
          confirmButtonText: "Great!",
          confirmButtonColor: "#343a40", // Matches --primary-color
          timer: 3000,
          timerProgressBar: true,
        });
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
      Swal.fire({
        title: "Error!",
        text: err?.response?.data?.message || "Failed to create blog",
        icon: "error",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#ff6b6b", // Matches --secondary-color
      });
    }finally{
      setIsPublishing(false);
    }
  };

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.2, duration: 0.4 },
    }),
  };

  const headingVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className={styles.outer_container}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <section className={styles.inner_container}>
        <motion.h1
          className={styles.heading}
          variants={headingVariants}
          initial="hidden"
          animate="visible"
        >
          Create a Blog
        <p className={styles.subheading}>Share your thoughts with the world</p>
        </motion.h1>
        <div className={styles.form_container}>
          <form onSubmit={handleSubmit} className={styles.inner_form_container}>
            {[
              {
                label: "Blog Title",
                id: "blog_title",
                name: "blogTitle",
                type: "text",
                placeholder: "Enter blog title",
                value: formData.blogTitle,
              },
              {
                label: "Author Name",
                id: "author_name",
                name: "authorName",
                type: "text",
                placeholder: "Enter author name",
                value: formData.authorName,
              },
              {
                label: "Blog Content",
                id: "blog_content",
                name: "blogContent",
                type: "textarea",
                placeholder: "Write a blog here",
                value: formData.blogContent,
              },
              {
                label: "Category",
                id: "category",
                name: "category",
                type: "select",
                value: formData.category,
              },
            ].map((field, index) => (
              <motion.div
                key={field.id}
                className={styles.input_container}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={inputVariants}
              >
                <label htmlFor={field.id}>{field.label}</label>
                {field.type === "textarea" ? (
                  <textarea
                    id={field.id}
                    placeholder={field.placeholder}
                    name={field.name}
                    value={field.value}
                    onChange={handleOnChange}
                    required
                  />
                ) : field.type === "select" ? (
                  <select
                    name={field.name}
                    id={field.id}
                    value={field.value}
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
                ) : (
                  <input
                    type={field.type}
                    id={field.id}
                    placeholder={field.placeholder}
                    name={field.name}
                    value={field.value}
                    onChange={handleOnChange}
                    required
                  />
                )}
              </motion.div>
            ))}

            <motion.div
              className={styles.input_container}
              custom={4}
              initial="hidden"
              animate="visible"
              variants={inputVariants}
            >
              <label>Upload Image</label>
              {previewImage && (
                <motion.div
                  className={styles.image_preview_container}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={previewImage} alt="Preview" />
                  <button
                    type="button"
                    className={styles.remove_image_btn}
                    onClick={handleImageRemove}
                    title="Remove image"
                  >
                    <TiDeleteOutline />
                  </button>
                </motion.div>
              )}
              <motion.div
                className={`${styles.drop_zone} ${isDragging ? styles.dragging : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <p>Drag & drop an image here or click to select</p>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleOnChange}
                  className={styles.file_input}
                  ref={fileInputRef}
                />
              </motion.div>
            </motion.div>

            <motion.button
              type="submit"
              className={styles.submit_btn}
              whileHover={{ scale: 1.05, backgroundColor: "#2c3036" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
            >
              {isPublishing?"Publishing...":"Publish Blog"}
            </motion.button>
          </form>
        </div>
      </section>
    </motion.div>
  );
};

export default CreateBlog;