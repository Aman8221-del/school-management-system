import axios from "axios";
import React, { useEffect, useState } from "react";

const StudentDashboardHome = () => {
  const [student, setstudent] = useState(null);

  useEffect(() => {
    const fetchprofile = async () => {
      try {
        const res = await axios.get("http://localhost:4000/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setstudent(res.data);
      } catch (error) {
        console.log(error)
      }
    };
    fetchprofile()
  }, []);

  if(!student){
    return <h2>Loading.....</h2>
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.location = "/login";
  };

  return (
    <div>
      {/* 🔥 Top Profile Card */}
      <div className="bg-white p-5 rounded-2xl shadow flex items-center justify-between mb-6">
        {/* profile side */}
        <div className="flex items-center gap-4">
          <img
            
            alt="profile"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-xl font-bold">{student.name}</h2>
            <p className="text-gray-500">{student.email}</p>
            <p className="text-sm text-gray-400">
              Class: {student.standerd} | Roll: {student.rollno}
            </p>
          </div>
        </div>

        {/* buttons side  */}
        <div className="flex items-center gap-3 ml-auto">
          <button className="bg-gray-900 text-white px-4 py-2 rounded-lg">
            Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* 🔥 Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="text-gray-600">Subjects</h2>
          <p className="text-2xl font-bold">5</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="text-gray-600">Attendance</h2>
          <p className="text-2xl font-bold">85%</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="text-gray-600">Results</h2>
          <p className="text-2xl font-bold">A Grade</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="text-gray-600">Pending Fees</h2>
          <p className="text-2xl font-bold">₹2000</p>
        </div>
      </div>

      {/* 🔥 Recent Activity */}
      <div className="bg-white mt-6 p-5 rounded-2xl shadow">
        <h3 className="text-lg font-bold mb-4">Recent Updates</h3>
        <ul className="space-y-2 text-gray-600">
          <li>📢 New notice uploaded</li>
          <li>📅 Exam from 10th April</li>
          <li>💰 Fee reminder pending</li>
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboardHome;
