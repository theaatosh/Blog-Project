import React, { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { FiLogOut } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { RiBloggerLine } from "react-icons/ri";
import { IoListCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import "../Styles/Sidebar.css";

const SIDEBAR_ITEMS = [
  { name: "HomePage", href: "/admin", icon: <IoHomeOutline /> },
  { name: "UserDetails", href: "/admin/userdetails", icon: <FaRegUser /> },
  { name: "New Blogs", href: "/admin/adminblogs", icon: <RiBloggerLine /> },

  {
    name: "Blogs List",
    href: "/admin/adminblogslist",
    icon: <IoListCircleOutline />,
  },
  { name: "Log Out", href: "/logout", icon: <FiLogOut /> },
];

const Sidebar = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="admin-layout">
      <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <button className="toggle-btn" onClick={handleToggleSidebar}>
          <div className="toggle-content">
            <TiThMenu className="menu-icon" />
            {isSidebarOpen && (
              <span className="toggle-text">Admin Dashboard</span>
            )}
          </div>
        </button>
        <nav className="sidebar-nav">
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href} className="sidebar-link">
              <span className="sidebar-icon">{item.icon}</span>
              {isSidebarOpen && <span className="ml-2">{item.name}</span>}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="main-content">{children}</main>
    </div>
  );
};
export default Sidebar;
