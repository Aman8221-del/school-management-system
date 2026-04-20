import React, { useState } from "react";
import schoolimage from "../assets/school.jpg";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/login", {
        username,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      alert(res.data.message);
      if (res.data.role === "admin") {
        window.location = "/admindashbord";
      } else if (res.data.role === "teacher") {
        window.location = "/teacherdashbord";
      } else if (res.data.role === "manager") {
        window.location = "/managerdashbord";
      } else {
        window.location = "/studentdashbord";
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${schoolimage})`,
          backgroundSize: "cover",
          backgroundPosition: " center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="min-h-screen flex items-center justify-center ">
          <form
            onSubmit={handleLogin}
            className="bg-white p-8 rounded-2xl shadow-lg w-96"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              School Login
            </h2>

            {/* username */}
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full mb-6 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
