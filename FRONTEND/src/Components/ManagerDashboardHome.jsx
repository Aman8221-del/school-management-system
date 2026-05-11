import axios from "axios";
import React, { useEffect, useState } from "react";

const ManagerDashboardHome = () => {
  const [manager, setmanager] = useState(null);
  

  useEffect(() => {
    const fetchprofile = async () => {
      try {
        const res = await axios.get("http://localhost:4000/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setmanager(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchprofile();
  }, []);

  if (!manager) {
    return <h2>Loading....</h2>;
  }

  const HandelLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location = "/";
  };

  return (
    <>
      {/* top profile card  */}

      <div className="bg-white p-5 rounded-2xl shadow flex items-center justify-between mb-6">
        {/* profile side  */}
        <div className="flex items-center gap-4">
          <img alt="profile" className="w-16 h-16 rounded-full border-1" />
          <div>
            <h2 className="text-xl font-bold">{manager.name}</h2>
            <p className="text-gray-500">{manager.email}</p>
          </div>
        </div>

        {/* button side  */}

        <div className="flex items-center gap-3 ml-auto">
          
          <button
            onClick={HandelLogout}
            className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default ManagerDashboardHome;
