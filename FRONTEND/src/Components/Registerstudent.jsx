import { useState } from "react";
import React from "react";
import "./App.css";
import axios from "axios";
import studentimage from "../assets/students.jpg";

const Register = () => {
  const [name, setname] = useState();
  const [role, setRole] = useState();
  const [username, setusername] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [fathername, setfathername] = useState();
  const [age, setage] = useState();
  const [rollno, setrollno] = useState();
  const [standerd, setstanderd] = useState();
  const [phone, setphone] = useState();

  const Registerstudent = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/signup", {
        name,
        username,
        email,
        password,
        fathername,
        age,
        rollno,
        standerd,
        role,
        phone,
      });
      alert(res.data.message);
      window.location = "/login";
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center "
        style={{
          backgroundImage: `url(${studentimage})`,
          backgroundPosition: "center ",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <form
          onSubmit={Registerstudent}
          className="bg-white/70 backdrop-blur-md p-5 mt-6 rounded-2xl shadow-lg w-full max-w-2xl"
        > 
          <h2 className="text-3xl font-bold mb-3 text-center text-blue-600">
            Student Registration
          </h2>
          <p className="text-sm text-center px-9 mb-4">
            'All students are required to fill in all the fields and ensure that
            all the details they provide are accurate and correct.'
          </p>
          <div className="flex items-center justify-center ">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-100 mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="student">Student</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}

            <div>
              <label className="block font-medium">Name</label>
              <input
                onChange={(e) => setname(e.target.value)}
                className="w-full border p-2 rounded-lg"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block font-medium">Username</label>
              <input
                onChange={(e) => setusername(e.target.value)}
                className="w-full border p-2 rounded-lg"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium">Email</label>
              <input
                onChange={(e) => setemail(e.target.value)}
                type="email"
                className="w-full border p-2 rounded-lg"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-medium">Password</label>
              <input
                onChange={(e) => setpassword(e.target.value)}
                type="password"
                className="w-full border p-2 rounded-lg"
              />
            </div>

            {/* Father Name */}
            <div>
              <label className="block font-medium">Father Name</label>
              <input
                onChange={(e) => setfathername(e.target.value)}
                className="w-full border p-2 rounded-lg"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block font-medium">Age</label>
              <input
                min="1"
                max="100"
                onChange={(e) => setage(e.target.value)}
                type="number"
                className="w-full border p-2 rounded-lg"
              />
            </div>

            {/* Roll No */}
            <div>
              <label className="block font-medium">Roll No</label>
              <input
                min="1"
                onChange={(e) => setrollno(e.target.value)}
                type="number"
                className="w-full border p-2 rounded-lg"
              />
            </div>

            {/* Class */}
            <div>
              <label className="block font-medium">Class</label>
              <input
                onChange={(e) => setstanderd(e.target.value)}
                className="w-full border p-2 rounded-lg"
              />
            </div>
            {/*phone*/}
            <div>
              <label className="block font-medium">Phone</label>
              <input
                onChange={(e) => setphone(e.target.value)}
                type="tel"
                maxLength="10"
                className="w-full border p-2 rounded-lg"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
