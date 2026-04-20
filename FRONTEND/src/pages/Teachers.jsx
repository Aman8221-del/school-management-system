import React, { useState, useEffect } from "react";
import axios from "axios";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    phone: "",
    standerd: "",
    subject: "",
  }); 

  // Fetch Teachers
  const fetchTeachers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/?role=teacher");
      setTeachers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // Handle Input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Reset Form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      username: "",
      password: "",
      phone: "",
      standerd: "",
      subject: "",
    });
    setEditId(null);
  };

  // Submit (Add / Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // 🔥 Update
        await axios.put(`http://localhost:4000/${editId}`, formData);
        alert("Teacher Updated");
      } else {
        // 🔥 Add
        await axios.post("http://localhost:4000/signup", {
          ...formData,
          role: "teacher",
        });
        alert("Teacher Added");
      }

      resetForm();
      setShowForm(false);
      fetchTeachers();
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4000/${id}`);
    fetchTeachers();
  };

  // Edit Click
  const handleEdit = (teacher) => {
    setFormData(teacher);
    setEditId(teacher._id);
    setShowForm(true);
  };

  return (
    <div>
      {/* Top Bar */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Teachers</h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Teacher
        </button>
      </div>

      {/* 🔥 Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg w-[500px] grid grid-cols-2 gap-4"
          >
            <h2 className="col-span-2 text-xl font-bold">
              {editId ? "Edit Teacher" : "Add Teacher"}
            </h2>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="border p-2"
            />
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="border p-2"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border p-2"
            />
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="border p-2"
            />
            <input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="border p-2"
            />
            <input
              name="standerd"
              value={formData.standerd}
              onChange={handleChange}
              placeholder="Class"
              className="border p-2"
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="border p-2"
            />

            <div className="col-span-2 flex justify-between">
              <button className="bg-green-600 text-white px-4 py-2 rounded">
                {editId ? "Update" : "Save"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="bg-white p-4 rounded shadow">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Subject</th>
              <th className="p-2 border">Class Teacher</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {teachers.map((t) => (
              <tr key={t._id} className="text-center">
                <td className="p-2 border">{t.name}</td>
                <td className="p-2 border">{t.email}</td>
                <td className="p-2 border">{t.subject}</td>
                <td className="p-2 border">{t.standerd}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleEdit(t)}
                    className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teachers;
