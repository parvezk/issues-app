"use client";
import Sidebar from "./Sidebar";
import "./dashboard.css";

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard">
      <aside>
        <Sidebar />
      </aside>
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;
