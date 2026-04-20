import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
    totalAttendance: 0,
  });

  // 🔥 Fetch data from backend
  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:4000/dashboard-stats");

      setStats({
        totalStudents: res.data.totalStudents,
        totalTeachers: res.data.totalTeachers,
        totalClasses: res.data.totalClasses,
        totalAttendance: res.data.totalAttendance || 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.location = "/";
  };

  return (
    <div>
      {/* top bar    */}
      <div className="flex justify-between text-center items-center">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        {/* button section logout only for Admin */}

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-7 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Cards */}
      <div className="grid py-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-600">Total Students</h2>
          <p className="text-2xl font-bold mt-2">{stats.totalStudents}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-600">Total Teachers</h2>
          <p className="text-2xl font-bold mt-2">{stats.totalTeachers}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-600">Total Classes</h2>
          <p className="text-2xl font-bold mt-2">{stats.totalClasses}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-600">Total Attendance</h2>
          <p className="text-2xl font-bold mt-2">{stats.totalAttendance}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
