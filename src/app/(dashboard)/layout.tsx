"use client";
import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { isAuth } from "@/utils/token";
import { redirect } from "next/navigation";
import "./dashboard.css";

const DashboardLayout = ({ children }) => {
  useEffect(() => {
    if (!isAuth()) {
      redirect("/signin");
    }
  }, []);

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
