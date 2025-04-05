import React, { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { Link, Outlet } from "react-router-dom";
import "../Styles/Sidebar.css";

const SIDEBAR_ITEMS = [
  { name: "HomePage", href: "/admin" },
  { name: "UserDetails", href: "/admin/userdetails" },
  { name: "Blogs", href: "/admin/adminblogs" },
  { name: "Log Out", href: "/logout" }, // Added Log Out option
];

const Sidebar = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <div className="admin-layout">
        <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
          <button
            className="toggle-btn flex gap-1 "
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <TiThMenu className="menu-icon" />
            <p
              className="text-[1vw]"
              style={isSidebarOpen ? {} : { display: "none" }}
            >
              Admin Dashboard
            </p>
          </button>
          <nav className="sidebar-nav">
            {SIDEBAR_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="sidebar-link"
                onClick={() => setIsSidebarOpen(false)} // Close sidebar on mobile after click
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="main-content">{children}</main>
      </div>
    </>
  );
};

export default Sidebar;
