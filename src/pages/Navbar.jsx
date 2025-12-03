import React from "react";
import { Link, useNavigate } from "react-router-dom";
import icon from "../assets/logo-icon.png";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white text-black py-4 shadow-lg overflow-hidden">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">

        <div className="flex items-center gap-4">
          <img src={icon} alt="logo" className="w-14 h-14 object-contain" />
          <h1 className="font-extrabold text-black text-lg">Money Manager</h1>
        </div>

        <div className="flex gap-8">
          <Link to="/home" className="hover:text-yellow-300 font-semibold text-black">Home</Link>
          <Link to="/about" className="hover:text-yellow-300 font-semibold text-black">About us</Link>
          <Link to="/contact" className="hover:text-yellow-300 font-semibold text-black">Contact us</Link>
        </div>

        <div className="flex gap-6">
          {!token ? (
            <>
              <Link to="/login" className="hover:text-yellow-300 font-bold text-black">Login</Link>
              <Link to="/signup" className="hover:text-yellow-300 bg-blue-600 px-4 py-1 rounded-sm font-bold text-white">
                Get Start
              </Link>
            </>
          ) : (
            <button 
              onClick={handleLogout} 
              className="hover:text-yellow-300 font-bold text-black"
            >
              Logout
            </button>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
