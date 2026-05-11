import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Students from "../pages/Students";
import Teachers from "../pages/Teachers";
import StudentDashboardHome from "./StudentDashboardHome";
import Studentnotices from "../pages/Studentnotices";

const Studentdashbord = () => {
  const [page, setpage] = useState("Dashboard");
  const PageRenderer = () => {
    switch (page) {
      case "Fees":
        return <Students />;
      case "Attendence":
        return <Teachers />;
      case "Notices":
        return <Studentnotices />;
      default:
        return <StudentDashboardHome />;
    }
  };
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <Sidebar setPage={setpage} role="student" />
        </div>
        {/* main Content */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
          <PageRenderer />
        </div>
      </div>
    </>
  );
};

export default Studentdashbord;
