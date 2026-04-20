import axios from "axios";
import React, { useEffect, useState } from "react";

const Studentnotices = () => {
  const [notices, setnotices] = useState([]);

  useEffect(() => {
    const fetchnotices = async () => {
      try {
        const res = await axios .get(
          "http://localhost:4000/notice/?type=student",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        setnotices(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchnotices();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">📢 Notices</h2>
      <div className="grid gap-4">
        {notices.map((notice) => (
          <div key={notice._id} className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-lg font-bold">📢 {notice.title}</h3>
            <p>{notice.description}</p>
            <p className="text-sm text-gray-400 mt-2">
              👥 {notice.audience} | 📅{" "}
              {new Date(notice.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Studentnotices;
