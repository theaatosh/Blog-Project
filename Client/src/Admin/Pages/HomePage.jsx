import React from "react";
import "../Styles/HomePage.css";

const HomePage = () => {
  // Sample dataset for dashboard cards
  const dashboardData = [
    {
      title: "Total Users",
      value: "1,234",
      color: "#4b6cb7",
    },
    {
      title: "Active Sessions",
      value: "892",
      color: "#2ecc71",
    },
    {
      title: "New Registrations",
      value: "45",
      color: "#e74c3c",
    },
    {
      title: "Revenue",
      value: "$12,450",
      color: "#f1c40f",
    },
  ];

  return (
    <>
      <div className="container">
        <h1 className="welcome-text">Welcome Admin</h1>
        <div className="dashboard-grid">
          {dashboardData.map((item, index) => (
            <div className="dashboard-card" key={index}>
              <h2>{item.title}</h2>
              <div className="number" style={{ color: item.color }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
