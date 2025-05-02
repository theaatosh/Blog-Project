import { useContext, useEffect, useState, useRef, useCallback } from "react";
import { storeContext } from "../../context/StoreContext";
import axios from "axios";
import { IoEye, IoPencil, IoTrash, IoPersonCircleOutline } from "react-icons/io5";
import styles from "./MyBlogs.module.css";
import showAlert from "../../utils/sweetAlert";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

// Custom Modal Component
const CustomModal = ({ isOpen, onClose, children, className, overlayClassName }) => {
  const modalRef = useRef(null);

  // Handle Escape key to close modal
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  // Focus trap: Ensure focus stays within modal
  useEffect(() => {
    if (isOpen) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTab = (e) => {
        if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      document.addEventListener("keydown", handleTab);
      firstElement?.focus();

      return () => {
        document.removeEventListener("keydown", handleTab);
      };
    }
  }, [isOpen]);

  // Add keyboard event listener when modal is open
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "auto";
      };
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return createPortal(
    <div className={`${styles.overlay} ${overlayClassName || ""}`}>
      <div
        className={`${styles.modal} ${className || ""}`}
        role="dialog"
        aria-modal="true"
        ref={modalRef}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

const MyBlogs = () => {
  const { url, user } = useContext(storeContext);
  const userId = user?._id;
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalBlogs: 0,
    limit: 5,
  });
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [editForm, setEditForm] = useState({
    blogTitle: "",
    blogContent: "",
    category: "",
    imageUrl: "",
    imageFile: null,
  });

  // Category colors
  const categoryColors = {
    Fashion: { bg_color: "#F3E8FF", color: "#6B46C1" },
    Tech: { bg_color: "#E6F3FA", color: "#2B6CB0" },
    Entertainment: { bg_color: "#FEF3C7", color: "#D69E2E" },
    Health: { bg_color: "#D1FAE5", color: "#276749" },
    Travel: { bg_color: "#E6FFFA", color: "#319795" },
  };

  // Status colors
  const statusColors = {
    draft: { bg_color: "#E0E0E0", color: "#616161" },
    pending: { bg_color: "#FFF3C7", color: "#D69E2E" },
    approved: { bg_color: "#D1FAE5", color: "#276749" },
    rejected: { bg_color: "#FEE2E2", color: "#DC2626" },
  };

  // Fetch user blogs
  const fetchBlogs = async (page = 1) => {
    if (!userId) {
      showAlert("Error", "Please log in to view your blogs!", "error");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get(
        `${url}/blog/myBlogs?page=${page}&limit=${pagination.limit}`,
        {
          withCredentials: true,
        }
      );
      setBlogs(res.data.data || []);
      setPagination(res.data.pagination || {
        currentPage: 1,
        totalPages: 1,
        totalBlogs: 0,
        limit: 5,
      });
    } catch (error) {
      showAlert(
        "Error",
        error.response?.data?.message || "Failed to fetch blogs",
        "error"
      );
    }
  };

  // Open view modal
  const openViewModal = (blog) => {
    setSelectedBlog(blog);
    setViewModalIsOpen(true);
  };

  // Open edit modal
  const openEditModal = (blog) => {
    setSelectedBlog(blog);
    setEditForm({
      blogTitle: blog.blogTitle,
      blogContent: blog.blogContent,
      category: blog.category,
      imageUrl: blog.imageUrl,
      imageFile: null,
    });
    setEditModalIsOpen(true);
  };

  // Handle edit form change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditForm((prev) => ({
        ...prev,
        imageFile: file,
        imageUrl: URL.createObjectURL(file), // Preview the new image
      }));
    }
  };

  // Handle image removal
  const handleImageRemove = () => {
    if (editForm.imageFile) {
      URL.revokeObjectURL(editForm.imageUrl);
    }
    setEditForm((prev) => ({
      ...prev,
      imageFile: null,
      imageUrl: "",
    }));
  };

  // Submit edit form
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("blogTitle", editForm.blogTitle);
      formData.append("blogContent", editForm.blogContent);
      formData.append("category", editForm.category);
      if (editForm.imageFile) {
        formData.append("image", editForm.imageFile);
      } else if (!editForm.imageUrl) {
        formData.append("imageUrl", ""); // Clear image if removed
      }

      const res = await axios.patch(
        `${url}/blog/update/${selectedBlog._id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setBlogs((prev) =>
        prev.map((blog) =>
          blog._id === selectedBlog._id ? res.data.blog : blog
        )
      );
      setEditModalIsOpen(false);
      showAlert("Success", "Blog updated successfully!", "success");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message.includes("Cloudinary")
          ? "Failed to upload image. Please try again."
          : "Failed to update blog";
      showAlert("Error", errorMessage, "error");
    }
  };

  // Delete blog
  const handleDelete = async (blogId) => {
    const result = await showAlert(
      "Confirm Delete",
      "Are you sure you want to delete this blog?",
      "warning",
      true,
      "Delete",
      "Cancel"
    );
    if (result.isConfirmed) {
      try {
        await axios.delete(`${url}/blog/delete/${blogId}`, {
          withCredentials: true,
        });
        setBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
        showAlert("Success", "Blog deleted successfully!", "success");
      } catch (error) {
        showAlert(
          "Error",
          error.response?.data?.message || "Failed to delete blog",
          "error"
        );
      }
    }
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchBlogs(newPage);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <div className={styles.header}>
          <h2>My Blogs</h2>
          <button
            className={styles.profile_btn}
            onClick={() => navigate(`/profile/${user._id}`)}
            title="View Profile"
          >
            <IoPersonCircleOutline /> Profile
          </button>
        </div>

        {blogs.length === 0 ? (
          <p className={styles.no_blogs}>
            No blogs found. Create your first blog!
          </p>
        ) : (
          <div className={styles.blogs_grid}>
            {blogs.map((blog) => {
              const categoryStyle = categoryColors[blog.category] || {
                bg_color: "#f1f2f6",
                color: "#636e72",
              };
              const statusStyle = statusColors[blog.status] || {
                bg_color: "#f1f2f6",
                color: "#636e72",
              };

              return (
                <div key={blog._id} className={styles.blog_card}>
                  <img
                    src={blog.imageUrl || "/placeholder.png"}
                    alt={blog.blogTitle}
                    className={styles.blog_image}
                  />
                  <div className={styles.blog_content}>
                    <h3 className={styles.blog_title}>{blog.blogTitle}</h3>
                    <div className={styles.meta}>
                      <span
                        style={{
                          backgroundColor: categoryStyle.bg_color,
                          color: categoryStyle.color,
                        }}
                      >
                        {blog.category}
                      </span>
                      <span
                        style={{
                          backgroundColor: statusStyle.bg_color,
                          color: statusStyle.color,
                        }}
                      >
                        {blog.status}
                      </span>
                    </div>
                    <p className={styles.excerpt}>
                      {blog.blogContent.slice(0, 100)}...
                    </p>
                    <p className={styles.date}>
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                    <div className={styles.actions}>
                      <button
                        onClick={() => openViewModal(blog)}
                        className={styles.action_btn}
                        title="View Blog"
                        aria-label="View Blog"
                      >
                        <IoEye />
                      </button>
                      {["draft", "pending"].includes(blog.status) && (
                        <>
                          <button
                            onClick={() => openEditModal(blog)}
                            className={styles.action_btn}
                            title="Edit Blog"
                            aria-label="Edit Blog"
                          >
                            <IoPencil />
                          </button>
                          <button
                            onClick={() => handleDelete(blog._id)}
                            className={styles.action_btn}
                            title="Delete Blog"
                            aria-label="Delete Blog"
                          >
                            <IoTrash />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalBlogs > pagination.limit && (
          <div className={styles.pagination}>
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPrevious}
              className={styles.page_btn}
              aria-label="Previous Page"
            >
              Previous
            </button>
            <span>
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNext}
              className={styles.page_btn}
              aria-label="Next Page"
            >
              Next
            </button>
          </div>
        )}

        {/* View Blog Modal */}
        <CustomModal
          isOpen={viewModalIsOpen}
          onClose={() => setViewModalIsOpen(false)}
          className={styles.modal}
          overlayClassName={styles.overlay}
        >
          {selectedBlog && (
            <div className={styles.modal_content}>
              <h2>{selectedBlog.blogTitle}</h2>
              <div className={styles.modal_meta}>
                <span
                  style={{
                    backgroundColor:
                      categoryColors[selectedBlog.category]?.bg_color ||
                      "#f1f2f6",
                    color:
                      categoryColors[selectedBlog.category]?.color || "#636e72",
                  }}
                >
                  {selectedBlog.category}
                </span>
                <span
                  style={{
                    backgroundColor:
                      statusColors[selectedBlog.status]?.bg_color || "#f1f2f6",
                    color:
                      statusColors[selectedBlog.status]?.color || "#636e72",
                  }}
                >
                  {selectedBlog.status}
                </span>
              </div>
              <img
                src={selectedBlog.imageUrl || "/placeholder.png"}
                alt={selectedBlog.blogTitle}
                className={styles.modal_image}
              />
              <p>{selectedBlog.blogContent}</p>
              <p className={styles.modal_date}>
                {new Date(selectedBlog.createdAt).toLocaleDateString()}
              </p>
              <button
                onClick={() => setViewModalIsOpen(false)}
                className={styles.close_btn}
                aria-label="Close Modal"
              >
                Close
              </button>
            </div>
          )}
        </CustomModal>

        {/* Edit Blog Modal */}
        <CustomModal
          isOpen={editModalIsOpen}
          onClose={() => setEditModalIsOpen(false)}
          className={styles.modal}
          overlayClassName={styles.overlay}
        >
          <div className={styles.modal_content}>
            <h2>Edit Blog</h2>
            <form onSubmit={handleEditSubmit} className={styles.edit_form}>
              <div className={styles.form_group}>
                <label htmlFor="blogTitle">Title</label>
                <input
                  id="blogTitle"
                  type="text"
                  name="blogTitle"
                  value={editForm.blogTitle}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className={styles.form_group}>
                <label htmlFor="blogContent">Content</label>
                <textarea
                  id="blogContent"
                  name="blogContent"
                  value={editForm.blogContent}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className={styles.form_group}>
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={editForm.category}
                  onChange={handleEditChange}
                  required
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {Object.keys(categoryColors).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.form_group}>
                <label>Image</label>
                {editForm.imageUrl ? (
                  <div className={styles.image_preview}>
                    <img
                      src={editForm.imageUrl}
                      alt="Blog preview"
                      className={styles.preview_image}
                    />
                    <button
                      type="button"
                      onClick={handleImageRemove}
                      className={styles.remove_image_btn}
                      aria-label="Remove Image"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <p>No image uploaded</p>
                )}
                <input
                  id="imageFile"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={styles.file_input}
                />
              </div>
              <div className={styles.form_actions}>
                <button type="submit" className={styles.submit_btn}>
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditModalIsOpen(false)}
                  className={styles.cancel_btn}
                  aria-label="Cancel Edit"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </CustomModal>
      </div>
    </div>
  );
};

export default MyBlogs;