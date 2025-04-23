import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import "../Styles/AdminBlogslist.css";

const AdminBlogslist = () => {
  const [data, setData] = useState([
    {
      title: "First Blog Post",
    },
    {
      title: "Second Blog Post",
    },
    {
      title: "Third Blog Post",
    },
    {
      title: "Fourth Blog Post",
    },
  ]);

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
            {data.map((item, index) => (
              <tr key={index} className="table-row">
                <td>{item.title}</td>
                <td className="action-buttons">
                  <button className="edit-btn">
                    <FaRegEdit /> Edit
                  </button>
                  <button className="delete-btn">
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
