import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <div className="temp">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
