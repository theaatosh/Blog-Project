import React, { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { FiLogOut } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { RiBloggerLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "../Styles/Sidebar.css";

const SIDEBAR_ITEMS = [
  { name: "HomePage", href: "/admin", icon: <IoHomeOutline /> },
  { name: "UserDetails", href: "/admin/userdetails", icon: <FaRegUser /> },
  { name: "Blogs", href: "/admin/adminblogs", icon: <RiBloggerLine /> },
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
        <button className="toggle-btn flex gap-1" onClick={handleToggleSidebar}>
          <TiThMenu className="menu-icon" />
          <p
            className="text-[0.5vw]"
            style={isSidebarOpen ? {} : { display: "none" }}
          >
            Admin Dashboard
          </p>
        </button>
        <nav className="sidebar-nav">
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href} className="sidebar-link">
              {item.icon && <span className="sidebar-icon">{item.icon}</span>}
              <span className={item.icon ? "ml-2" : ""}>{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
