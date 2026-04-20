import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Students from "../pages/Students";
import Queryspage from "../pages/Queryspage";
import Teachersnotice from "../pages/Teachersnotice";
import LeaveApplication from "../pages/LeaveApplication";

const ManagerDashboard = () => {
  const [page, setPage] = useState("Dashboard");

  // Ye decide karega kaunsa page show hoga
  const PageRenderer = () => {
    switch (page) {
      case "Querys":
        return <Queryspage />;
      case "Notices":
        return <Teachersnotice/>;
        case "Applications":
          return <LeaveApplication/>
      default:
    }
  };
  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar setPage={setPage} role="manager" />

        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-100 min-h-screen">
          <PageRenderer />
        </div>
      </div>
    </>
  );
};

export default ManagerDashboard;
