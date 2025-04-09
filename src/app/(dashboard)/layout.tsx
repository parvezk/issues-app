"use client";
import React, { useEffect } from "react";
import { isAuth } from "@/utils/token";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import "./dashboard.css";

const DashboardLayout = ({ children }) => {
  useEffect(() => {
    if (!isAuth()) {
      redirect("/signin");
    }
  }, []);

  return (
    <div className="container" suppressHydrationWarning={true}>
      <TopBar />
      <section className="dashboard">
        <aside>
          <Sidebar />
        </aside>
        <main>{children}</main>
      </section>
    </div>
  );
};

export default DashboardLayout;
