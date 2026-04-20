import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminApplications = () => {
  const [apps, setApps] = useState([]);
 
  const fetchApps = async () => {
    const res = await axios.get("http://localhost:4000/application/all", {
      
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    
    console.log(apps.teacherId);

    setApps(res.data.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(
      `http://localhost:4000/application/status/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    // ✅ refresh list
    fetchApps();
  };

  useEffect(() => {
    fetchApps();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Applications</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Teacher</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Message</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {apps.map((app) => (
            <tr key={app._id}>
              
              <td className="border text-center p-2">{app.teacherId?.name || "not found"}</td>
              <td className="border text-center p-2">{app.leaveType}</td>
              <td className="border p-2 max-w-[200px] break-words">
                {app.reason}
              </td>

              <td className="border text-center p-2">
                {new Date(app.createdAt).toLocaleString()}
              </td>
              <td className="border text-center p-2">{app.status}</td>

              <td className="border p-2 text-center space-x-2">
                <button
                  onClick={() => updateStatus(app._id, "approved")}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(app._id, "rejected")}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminApplications;
