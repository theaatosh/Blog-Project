import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import "../Styles/UserDetails.css";

const UserDetails = () => {
  const [data, setData] = useState([
    {
      name: "Sandesh Basnet",
      email: "sandesh@gmail.com",
      phone: "9800000000",
    },
    {
      name: "Ramesh Shrestha",
      email: "ramesh@gmail.com",
      phone: "9811111111",
    },
    {
      name: "Sita Thapa",
      email: "sita@gmail.com",
      phone: "9822222222",
    },
    {
      name: "Hari Gurung",
      email: "hari@gmail.com",
      phone: "9833333333",
    },
  ]);

  return (
    <div className="user-details-main">
      <h1 className="user-details-text">User Details</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Users ..."
          className="search-input"
        />
      </div>
      <div className="user-details-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="table-row">
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
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

export default UserDetails;
