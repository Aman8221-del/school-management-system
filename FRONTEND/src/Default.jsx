import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Register from "./Components/Registerstudent";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Teacherdashbord from "./Components/Teacherdashbord";
import Studentdashbord from "./Components/Studentdashbord";
import AdminDashboard from "./Components/Admindashbord";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProtectedRoute from "./Components/ProtectedRoute";
import ManagerDashboard from "./Components/ManagerDashboard";

const Default = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        ></Route>

        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
            </>
          }
        ></Route>

        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
            </>
          }
        ></Route>

        <Route
          path="/signup"
          element={
            <>
              <Navbar /> <Register />
            </>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
            </>
          }
        ></Route>
        <Route
          path="/admindashbord"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/teacherdashbord"
          element={
            <ProtectedRoute role="teacher">
              <Teacherdashbord />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/studentdashbord"
          element={
            <ProtectedRoute role="student">
              <Studentdashbord />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/managerdashbord"
          element={
            <ProtectedRoute role="manager">
              <ManagerDashboard />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Default;
