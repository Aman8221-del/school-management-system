import React, { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHome from "./AdminDashboardHome";
import Students from "../pages/Students";
import Teachers from "../pages/Teachers";
import AdminNotices from "../pages/AdminNotices";
import Managers from "../pages/Managers";
import AdminApplications from "../pages/AdminApplicationsDashboard";

const AdminDashboard = () => {
  const [page, setPage] = useState("Dashboard");

  // Ye decide karega kaunsa page show hoga
  const PageRenderer = () => {
    switch (page) {
      case "Students":
        return <Students />;
      case "Teachers":
        return <Teachers />;
      case "Notices":
        return <AdminNotices />;
      case "Managers":
        return <Managers />;
      case "Applications":
        return <AdminApplications />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar setPage={setPage} role="admin" />

        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-100 min-h-screen">
          <PageRenderer />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
