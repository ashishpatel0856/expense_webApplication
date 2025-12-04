import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import icon from "../assets/logo-icon.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    navigate("/login");
  };

  const isDashboard = location.pathname === "/dashboard";

  const handleDashboardClick = (e) => {
    e.preventDefault();
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  };

  return (
    <nav className="w-full bg-white text-black py-4 shadow-lg fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center px-6 justify-between">
        
        {/* Left Corner: Logo */}
        <div className="flex items-center gap-2">
          <img src={icon} alt="logo" className="w-14 h-14 object-contain" />
          <h1 className="font-extrabold text-black text-lg">Money Manager</h1>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex gap-8">
          <Link to="/home" className="hover:text-yellow-300 font-semibold text-black">Home</Link>
          <Link to="/about" className="hover:text-yellow-300 font-semibold text-black">About us</Link>
          <Link to="/contact" className="hover:text-yellow-300 font-semibold text-black">Contact us</Link>
        </div>

        {/* Right Corner: Auth & Dashboard */}
        <div className="flex items-center gap-2">
          {!token ? (
            <>
              {/* Show Dashboard button only if not on dashboard */}
              {!isDashboard && (
                <button
                  onClick={handleDashboardClick}
                  className="hover:text-yellow-300 bg-blue-700 px-4 py-1 rounded-sm font-bold text-white"
                >
                  Dashboard
                </button>
              )}

              <Link
                to="/login"
                className="hover:text-yellow-300 font-bold text-black px-4 py-1 rounded-sm border border-gray-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="hover:text-yellow-300 bg-blue-500 px-4 py-1 rounded-sm font-bold text-white"
              >
                Get Start
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="hover:text-yellow-300 font-bold bg-blue-600 rounded-sm px-2 py-1 text-black"
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
