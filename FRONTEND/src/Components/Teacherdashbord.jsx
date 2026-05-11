import React, { useState } from "react";
import Teachers from "../pages/Teachers";
import Sidebar from "./Sidebar";
import TeacherDashboardHome from "./TeacherDashboardHome";
import Students from "../pages/Students";
import Teachersnotice from "../pages/Teachersnotice";
import LeaveApplication from "../pages/LeaveApplication";

const Teacherdashbord = () => {
  const [page, setPage] = useState("Dashboard");

  const PageRenderer = () => {
    switch (page) {
      case "Classes":
        return <Students />;
      case "Attendence":
        return <Teachers />;
      case "Notices":
        return <Teachersnotice />;
      case "Applications":
        return <LeaveApplication />;
      default:
        return <TeacherDashboardHome />;
    }
  };
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* sidebar  */}
        <div className="w-64 flex-shrink-0">
          <Sidebar setPage={setPage} role="teacher" />
        </div>
        {/* main content  */}
        <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <PageRenderer />
        </div>
      </div>
    </>
  );
};

export default Teacherdashbord;
