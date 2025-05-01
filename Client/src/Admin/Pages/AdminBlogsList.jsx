import React, { use, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import "../Styles/AdminBlogslist.css";
import axios from "axios";

const AdminBlogslist = () => {
  const [data, setData] = useState([]);
  async function fetchData() {
    try {
      const res = await axios.get("http://localhost:5010/blog/");
      setData(res.data.blogs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function deleteBlog(id) {
    try {
      const res = await axios.delete(
        `http://localhost:5010/blog/delete/admin/${id}`
      );
      if (res.status === 200) {
        alert("Blog deleted successfully");
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="user-details-main">
      <h1 className="blog-list-text">Blog List</h1>
      <div className="bloglist-search-container">
        <input
          type="text"
          placeholder="Search Blogs ..."
          className="search-input"
        />
      </div>
      <div className="user-details-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.blog._id} className="table-row">
                <td>{item.blog.blogTitle}</td>
                <td className="action-buttons">
                  {/* <button className="edit-btn">
                    <FaRegEdit /> Edit
                  </button> */}
                  <button
                    className="delete-btn"
                    onClick={() => deleteBlog(item.blog._id)}
                  >
                    <RiDeleteBin6Line /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBlogslist;
