import React, { useEffect, useState } from "react";
import axios from "axios";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  const [classes, setClasses] = useState([]);

  // 🔥 Fetch classes (from DB)
  const fetchClasses = async () => {
    try {
      const res = await axios.get("http://localhost:4000/class/class");
      setClasses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 Fetch students
  const fetchStudents = async (classId = "") => {
    try {
      let url = "http://localhost:4000/?role=student";

      if (classId) {
        url += `&classId=${classId}`;
      }

      const res = await axios.get(url);
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchStudents();
  }, []);

  // 🔥 Class click
  const handleClassClick = (classId) => {
    setSelectedClass(classId);
    fetchStudents(classId);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Students</h1>

      {/* 🔥 Class Buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        {classes.map((cls) => (
          <button
            key={cls._id}
            onClick={() => handleClassClick(cls._id)}
            className={`px-3 py-1 rounded ${
              selectedClass === cls._id
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {cls.className}-{cls.section}
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
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Class</th>
              <th className="p-2 border">Father's Name</th>
              <th className="p-2 border">Roll No</th>
              <th className="p-2 border">Phone</th>
            </tr>
          </thead>

          <tbody>
            {students.length > 0 ? (
              students.map((stu) => (
                <tr key={stu._id} className="text-center">
                  <td className="p-2 border">{stu.name}</td>
                  <td className="p-2 border">{stu.email}</td>
                  <td className="p-2 border">
                    {stu.classId?.className}-{stu.classId?.section}
                  </td>
                  <td className="p-2 border">{stu.fathername}</td>
                  <td className="p-2 border">{stu.rollno}</td>
                  <td className="p-2 border">{stu.phone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
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
