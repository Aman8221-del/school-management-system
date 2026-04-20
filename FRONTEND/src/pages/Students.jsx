import React, { useEffect, useState } from "react";
import axios from "axios";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  // 🔥 1st se 12th tak classes generate
  const classes = Array.from({ length: 12 }, (_, i) => `${i + 1}th`);

  // Fetch students
  const fetchStudents = async (cls = "") => {
    try {
      let url = "http://localhost:4000/?role=student";

      if (cls) {
        url += `&standerd=${cls}`;
      }

      const res = await axios.get(url);
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Class click
  const handleClassClick = (cls) => {
    setSelectedClass(cls);
    fetchStudents(cls);
  };

  return (
    <div>
      
      <h1 className="text-2xl font-bold mb-6">Students</h1>

      {/* 🔥 Class Buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        {classes.map((cls) => (
          <button
            key={cls}
            onClick={() => handleClassClick(cls)}
            className={`px-3 py-1 rounded ${
              selectedClass === cls ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {cls}
          </button>
        ))}

        {/* All Button */}
        <button
          onClick={() => {
            setSelectedClass("");
            fetchStudents();
          }}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          All
        </button>
      </div>

      {/* 🔥 Students Table */}
      <div className="bg-white p-4 rounded shadow">
        <search>search</search>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Class</th>
              <th className="p-2 border">Father's name</th>
              <th className="p-2 border">Rollno</th>
              <th className="p-2 border">Phone</th>
            </tr>
          </thead>

          <tbody>
            {students.length > 0 ? (
              students.map((stu) => (
                <tr key={stu._id} className="text-center">
                  <td className="p-2 border">{stu.name}</td>
                  <td className="p-2 border">{stu.email}</td>
                  <td className="p-2 border">{stu.standerd}</td>
                  <td className="p-2 border">{stu.fathername}</td>
                  <td className="p-2 border">{stu.rollno}</td>
                  <td className="p-2 border">{stu.phone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No Students Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
