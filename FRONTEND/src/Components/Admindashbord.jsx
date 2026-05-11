import React, { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHome from "./AdminDashboardHome";
import Students from "../pages/Students";
import Teachers from "../pages/Teachers";
import AdminNotices from "../pages/AdminNotices";
import Managers from "../pages/Managers";
import AdminApplications from "../pages/AdminApplicationsDashboard";
import Classes from "../pages/Classes";

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
      case "Classes":
        return <Classes />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar setPage={setPage} role="admin" />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
        <PageRenderer />
      </div>
    </div>
  );
};

export default AdminDashboard;
