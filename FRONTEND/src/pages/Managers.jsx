import axios from "axios";
import React, { useEffect, useState } from "react";

const Managers = () => {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [managers, setmanagers] = useState([]);

  //   form inputs data
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    phone: "",
  });

  // Handle Input
  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  // Fetch managers

  const fetchManagers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/?role=manager");
      setmanagers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  //   reset form
  const resetForm = () => {
    setformdata({
      name: "",
      email: "",
      username: "",
      password: "",
      phone: "",
    });
    setEditId(null);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:4000/${editId}`, formdata);
        alert("Manager data Updated");
      } else {
        const res = await axios.post("http://localhost:4000/signup", {
          ...formdata,
          role: "manager",
        });
        alert(res.data.message);
      }
      resetForm();
      setShowForm(false);
      fetchManagers();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4000/${id}`);
    fetchManagers();
  };

  // Edit Click
  const handleEdit = (managers) => {
    setformdata(managers)
    setEditId(managers._id);
    setShowForm(true);
  };

  return (
    <div>
      {/* topbar  */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Managers</h1>
        <button
          onClick={() => {
            setShowForm(true);
            resetForm();
          }}
          className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded"
        >
          + Add Manager
        </button>
      </div>

      {/* mangers adding form  */}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <form
            onSubmit={handelSubmit}
            className="bg-white p-6 rounded-lg w-[500px] grid grid-cols-2 gap-4"
          >
            <h2 className="col-span-2 text-xl font-bold">
              {editId ? "Edit Manager" : "Add Manager"}
            </h2>

            <input
            
              value={formdata.name}
              onChange={handleChange}
              name="name"
              placeholder="Name"
              className="border p-2"
            />
            <input
            name="username"
              value={formdata.username}
              onChange={handleChange}
              placeholder="Username"
              className="border p-2"
            />
            <input
            
              value={formdata.email}
              onChange={handleChange}
              name="email"
              placeholder="Email"
              className="border p-2"
            />
            <input
              value={formdata.password}
              onChange={handleChange}
              name="password"
              placeholder="Password"
              className="border p-2"
            />

            <input
              value={formdata.phone}
              onChange={handleChange}
              name="phone"
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

      {/* table  */}

      <div className="bg-white p-4 rounded shadow">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {managers.map((m) => (
              <tr key={m._id} className="text-center">
                <td className="p-2 border">{m.name}</td>
                <td className="p-2 border">{m.email}</td>
                <td className="p-2 border">{m.phone}</td>
                <td onClick={() => handleEdit(m)} className="p-2 border">
                  <button className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete()}
                    className="bg-red-500 text-white px-2 py-1 mr-2 rounded"
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

export default Managers;
