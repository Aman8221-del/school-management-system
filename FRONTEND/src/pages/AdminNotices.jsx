import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminNotices = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [audience, setaudience] = useState();
  const [notices, setnotices] = useState([]);

  const fetchnotices = async () => {
    try {
      const res = await axios.get("http://localhost:4000/notice/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setnotices(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchnotices();
  }, []);

  const HandelForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/notice/",
        {
          title,
          description,
          audience,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const Handeldelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4000/notice/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert(res.data.message)
      
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed")
    }
  };
  return (
    <div>
      {/* 🔥 Header */}
      <div className="bg-white shadow p-4 flex justify-between items-center rounded-lg mb-6">
        <h2 className="text-3xl font-bold">📢 Notices</h2>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          {showForm ? "Close" : "+ Notice"}
        </button>
      </div>

      {/* 🔥 Form UI */}
      {showForm && (
        <form
          onSubmit={HandelForm}
          className="bg-white p-6 rounded-2xl shadow mb-6"
        >
          <h3 className="text-xl font-bold mb-4">Add New Notice</h3>

          <div className="space-y-4">
            <input
              onChange={(e) => settitle(e.target.value)}
              type="text"
              placeholder="Enter Notice Title"
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <textarea
              onChange={(e) => setdescription(e.target.value)}
              placeholder="Enter Description"
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
            />

            <select
              onChange={(e) => setaudience(e.target.value)}
              className="w-full border p-3 rounded-lg"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="all">All</option>
            </select>

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Create Notice
            </button>
          </div>
        </form>
      )}

      {/* 🔥 Notices List UI (Dummy Cards) */}
      <div className="grid gap-4">
        {notices.map((notice) => {
          return (
            <div
              key={notice._id}
              className="bg-white p-5 rounded-xl shadow flex justify-between"
            >
              <div>
                <h3 className="text-lg font-bold">📢 {notice.title}</h3>
                <p className="text-gray-600">{notice.description}</p>

                <p className="text-sm text-gray-400 mt-2">
                  👥 {notice.audience} | 📅{" "}
                  {new Date(notice.createdAt).toLocaleDateString()}
                </p>

                <p className="text-xs text-gray-400">
                  Created by: {notice.createdBy?.name}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="bg-yellow-500 text-white px-3 py-1 rounded-lg">
                  Edit
                </button>
                <button onClick={()=>{Handeldelete(notice._id)}} className="bg-red-500 text-white px-3 py-1 rounded-lg">
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminNotices;
