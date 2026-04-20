import axios from "axios";
import React, { useEffect, useState } from "react";

const LeaveApplication = () => {
  const [showform, setshowForm] = useState(false);
  const [leaveType, setleaveType] = useState("");
  const [reason, setreason] = useState("");
  const [appli, setappli] = useState([]);

  //   fetch applications

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/application/my-applications",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setappli(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handelSubmit = async (e) => {
    e.preventDefault();

    if (!leaveType || !reason) {
      alert("All fields are required");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:4000/application/apply",
        { leaveType, reason },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      alert(res.data.message);
      setleaveType("");
      setreason("");
      setshowForm(false);
      fetchApplications();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message);
    }
  };

  return (
    <div>
      {/* top bar */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">My Applications</h1>
        <button
          onClick={() => {
            setshowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Apply Leave
        </button>
      </div>

      {/* leave apply From */}
      {showform && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <form
            onSubmit={handelSubmit}
            className="bg-white p-6 rounded-lg w-[500px] gap-4"
          >
            <h1 className="text-2xl font-bold mb-4">Apply Leave</h1>
            <select
              value={leaveType}
              onChange={(e) => setleaveType(e.target.value)}
              className="w-full border px-3 py-2 mb-5 rounded mt-1"
            >
              <option value="">select Leave Type</option>
              <option value="Mandatory Leave">Mandatory Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Maternity Leave">Maternity Leave</option>
              <option value="Paternity Leave">Paternity Leave</option>
              <option value="Emergency Leave">Emergency Leave</option>
              <option value="Study Leave">Study Leave</option>
              <option value="Half Day Leave">Half Day Leave</option>
            </select>

            <textarea
              value={reason}
              onChange={(e) => setreason(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Write your application..."
            />

            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Submit
            </button>
          </form>
        </div>
      )}

      <div className="p-6">
        {appli.map((app) => (
          <div key={app._id} className="border p-3 mb-3 rounded shadow">
            <h2 className=" font-semibold">{app.leaveType}</h2>
            <p>{app.reason}</p>
            <p className="text-sm text-gray-500">
              {new Date(app.createdAt).toLocaleString()}
            </p>

            <p
              className={
                app.status === "approved"
                  ? "text-green-500"
                  : app.status === "rejected"
                    ? "text-red-500"
                    : "text-yellow-500"
              }
            >
              {app.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveApplication;
