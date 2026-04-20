import axios from "axios";
import React, { useEffect, useState } from "react";

const TeacherDashboardHome = () => {
  const [teacher, setteacher] = useState(null);

  useEffect(() => {
    const fetchprofile = async () => {
      try {
        const res = await axios.get("http://localhost:4000/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setteacher(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchprofile()
  }, []);

  if (!teacher) {
    return <h2>Loading....</h2>;
  }

  const handelLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location="/"
  };

  return (
    <div>
      {/* top profice card  */}
      <div className="bg-white p-5 rounded-2xl shadow flex items-center justify-between mb-6">
        {/* profile side  */}
        <div className="flex items-center gap-4">
          <img
            
            alt="profile"
            className="w-16 h-16 rounded-full border-1"
          />
          <div>
            <h2 className="text-xl font-bold">{teacher.name}</h2>
            <p className="text-gray-500">{teacher.email}</p>
          </div>
        </div>
        {/* button side  */}

        <div className="flex items-center gap-3 ml-auto">
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg">
            Edit Profile
          </button>
          <button onClick={handelLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg">
            Logout
          </button>
        </div>
      </div>

      {/* Overview Cards  */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="text-gray-600">Classes</h2>
          <p className="text-2xl font-bold">8</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="text-gray-600">Attendence</h2>
          <p className="text-2xl font-bold">45%</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="text-gray-600">Marks</h2>
          <p className="text-2xl font-bold">34</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="text-gray-600">Notices</h2>
          <p className="text-2xl font-bold">2</p>
        </div>
      </div>

      {/* Recent activity  */}
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

export default TeacherDashboardHome;
