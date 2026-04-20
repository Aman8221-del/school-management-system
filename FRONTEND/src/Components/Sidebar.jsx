import React from "react";

const Sidebar = ({ setPage, role }) => {
  const menuItems = {
    admin: [
      "Dashboard",
      "Managers",
      "Teachers",
      "Students",
      "Classes",
      "Attendance",
      "Marks",
      "Fees",
      "Applications",
      "Notices",
      "Admins",
      "Settings",
    ],
    teacher: [
      "Dashboard",
      "Classes",
      "Attendence",
      "Marks",
      "Notices",
      "Applications",
    ],
    student: ["Dashboard", "Attendence", "Results", "Fees", "Notices"],
    manager: ["Dashboard", "Querys", "Notices", "Applications"],
  };

  return (
    <>
      <div className="w-64 h-screen bg-gray-900 text-white p-5">
        {/* Logo / Title */}
        <h1 className="text-2xl font-bold mb-6 capitalize">{role} panel</h1>
        {/* Menu */}
        <ul>
          {menuItems[role]?.map((item) => (
            <li
              key={item}
              onClick={() => setPage(item)}
              className="mb-3 p-2 rounded cursor-pointer hover:bg-gray-700 transition"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
