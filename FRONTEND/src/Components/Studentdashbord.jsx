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
          return <Studentnotices/>
        default:
          return <StudentDashboardHome/>
    }
  };
  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar setPage={setpage} role="student" />
        {/* main Content */}
        <div className="flex-1 p-6 bg-gray-100 min-h-screen">
          <PageRenderer />
        </div>
      </div>
    </>
  );
};

export default Studentdashbord;
