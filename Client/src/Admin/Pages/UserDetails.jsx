import { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import "../Styles/UserDetails.css";

const UserDetails = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:5010/admin/";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/userDetails`);
        const result = await response.json();
        if (response.ok) {
          setData(result.userDetails);
          setLoading(false);
        } else {
          throw new Error(result.message || "Failed to fetch users");
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter(
    (item) =>
      item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    console.log(id);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${API_URL}/deleteUser/${id}`, {
          method: "DELETE",
        });
        const result = await response.json();
        if (response.ok) {
          setData(data.filter((item) => item._id !== id));
          Swal.fire("Deleted!", "The user has been deleted.", "success");
        } else {
          throw new Error(result.message || "Failed to delete user");
        }
      } catch (err) {
        Swal.fire("Error!", err.message, "error");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-details-main">
      <h1 className="user-details-text">User Details</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Users ..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="user-details-container">
        <div className="table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item._id} className="table-row">
                  <td data-label="Name">{item.fullName}</td>
                  <td data-label="Email">{item.email}</td>
                  <td data-label="Status">{item.status || "N/A"}</td>
                  <td data-label="Actions" className="action-buttons">
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item._id)}
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
    </div>
  );
};

export default UserDetails;
