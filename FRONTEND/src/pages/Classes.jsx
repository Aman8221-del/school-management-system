import React, { useEffect, useState } from "react";
import axios from "axios";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  // 🔥 Class States
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");

  // 🔹 Fetch Classes
  const fetchClasses = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/class/class"
      );

      setClasses(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Fetch Teachers
  const fetchTeachers = async () => {
    try {

      const res = await axios.get(
        "http://localhost:4000/?role=teacher"
      );

      setTeachers(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchTeachers();
  }, []);

  // 🔹 Create Class
  const handleCreate = async () => {

    if (!className.trim() || !section.trim()) {

      return alert("Enter class and section");
    }

    try {

      await axios.post(
        "http://localhost:4000/class/class",
        {
          className,
          section,
        }
      );

      // 🔥 Clear Inputs
      setClassName("");
      setSection("");

      fetchClasses();

    } catch (err) {

      console.log(err);
    }
  };

  // 🔹 Assign / Change / Remove Teacher
  const handleAssign = async (
    classId,
    teacherId
  ) => {

    try {

      await axios.put(
        `http://localhost:4000/class/class/${classId}`,
        {
          classTeacher: teacherId || null,
        }
      );

      fetchClasses();

    } catch (err) {

      console.log(
        err.response?.data?.message
      );
    }
  };

  return (
    <div className="p-6">

      {/* 🔥 Header */}
      <h1 className="text-2xl font-bold mb-6">
        Classes
      </h1>

      {/* 🔥 Create Class */}
      <div className="flex gap-3 mb-6">

        {/* Class Input */}
        <input
          value={className}
          onChange={(e) =>
            setClassName(e.target.value)
          }
          placeholder="Enter Class (10, 12)"
          className="border p-2 rounded w-64"
        />

        {/* Section Input */}
        <input
          value={section}
          onChange={(e) =>
            setSection(e.target.value)
          }
          placeholder="Enter Section (A, B)"
          className="border p-2 rounded w-40"
        />

        {/* Button */}
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Class
        </button>

      </div>

      {/* 🔥 Classes Table */}
      <div className="bg-white p-4 rounded shadow">

        <table className="w-full border">

          <thead>

            <tr className="bg-gray-200">

              <th className="p-2 border">
                Class
              </th>

              <th className="p-2 border">
                Section
              </th>

              <th className="p-2 border">
                Class Teacher
              </th>

              <th className="p-2 border">
                Assign / Change / Remove
              </th>

            </tr>

          </thead>

          <tbody>

            {classes.map((c) => (

              <tr
                key={c._id}
                className="text-center"
              >

                {/* Class */}
                <td className="p-2 border">
                  {c.className}
                </td>

                {/* Section */}
                <td className="p-2 border">
                  {c.section}
                </td>

                {/* Teacher */}
                <td className="p-2 border">

                  {c.classTeacher
                    ? c.classTeacher.name
                    : "Not Assigned"}

                </td>

                {/* Dropdown */}
                <td className="p-2 border">

                  <select
                    className="border p-1 rounded"
                    value={
                      c.classTeacher?._id || ""
                    }
                    onChange={(e) =>
                      handleAssign(
                        c._id,
                        e.target.value
                      )
                    }
                  >

                    <option value="">
                      Remove Teacher
                    </option>

                    {teachers.map((t) => (

                      <option
                        key={t._id}
                        value={t._id}
                      >
                        {t.name}
                      </option>

                    ))}

                  </select>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Classes;