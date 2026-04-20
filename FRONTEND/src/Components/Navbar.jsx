import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-bold">🏫 SchoolMS</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link className="hover:text-yellow-300" to="/">
              Home
            </Link>
            <Link to="/about" className="hover:text-yellow-300">
              About
            </Link>
            <Link to="/contact" className="hover:text-yellow-300">
              Contact
            </Link>
          </div>

          {/* Buttons */}
          <div className="hidden md:flex space-x-3">
            <Link to="/login">
              <button className=" cursor-pointer bg-white text-blue-700 px-4 py-1 rounded hover:bg-gray-200">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="cursor-pointer bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-300">
                Register
              </button>
            </Link>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <Link className="block py-2" to="/">
            Home
          </Link>

          <a href="#" className="block py-2">
            About
          </a>
          <a href="#" className="block py-2">
            Students
          </a>
          <a href="#" className="block py-2">
            Teachers
          </a>
          <a href="#" className="block py-2">
            Contact
          </a>

          <button className="w-full mt-2 bg-white text-blue-700 py-1 rounded">
            <Link to="/login">Login</Link>
          </button>
          <button className="w-full mt-2 bg-yellow-400 text-black py-1 rounded">
            <Link to="/signup"> Register</Link>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
