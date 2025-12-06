import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import icon from "../assets/logo-icon.png";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);

  const isDashboard = location.pathname === "/dashboard";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    navigate("/login");
  };

  const handleDashboardClick = () => {
    token ? navigate("/dashboard") : navigate("/signup");
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-900 text-black dark:text-white shadow-lg fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        
        {/* LEFT: Logo */}
        <div className="flex items-center gap-2">
          <img src={icon} alt="logo" className="w-12 h-12 object-contain" />
          <h1 className="font-extrabold text-lg">Money Manager</h1>
        </div>

        {/* CENTER: Links (hidden on mobile) */}
        <div className="hidden md:flex gap-8">
          <Link to="/home" className="hover:text-yellow-500 font-semibold">Home</Link>
          <Link to="/about" className="hover:text-yellow-500 font-semibold">About Us</Link>
          <Link to="/contact" className="hover:text-yellow-500 font-semibold">Contact Us</Link>
        </div>

        {/* RIGHT: Auth / Dashboard */}
        <div className="hidden md:flex items-center gap-2">
          {!token && !isDashboard && (
            <button
              onClick={handleDashboardClick}
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-1 rounded-sm font-bold"
            >
              Dashboard
            </button>
          )}

          {!token ? (
            <>
              <Link
                to="/login"
                className="px-4 py-1 border border-gray-300 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-800 font-bold"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-sm text-white font-bold"
              >
                Get Start
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className=" dark:bg-black-900 hover:bg-blue-900 px-4 py-1 rounded-sm text-white font-bold"
            >
              Logout
            </button>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="flex flex-col gap-4 p-4">
            <Link onClick={() => setOpen(false)} to="/home" className="font-semibold hover:text-yellow-500">
              Home
            </Link>
            <Link onClick={() => setOpen(false)} to="/about" className="font-semibold hover:text-yellow-500">
              About Us
            </Link>
            <Link onClick={() => setOpen(false)} to="/contact" className="font-semibold hover:text-yellow-500">
              Contact Us
            </Link>
            
            {!token && !isDashboard && (
              <button
                onClick={() => { handleDashboardClick(); setOpen(false); }}
                className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-1 rounded-sm font-bold"
              >
                Dashboard
              </button>
            )}

            {!token ? (
              <>
                <Link
                  onClick={() => setOpen(false)}
                  to="/login"
                  className="px-4 py-1 border border-gray-300 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-800 font-bold"
                >
                  Login
                </Link>
                <Link
                  onClick={() => setOpen(false)}
                  to="/signup"
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-sm text-white font-bold"
                >
                  Get Start
                </Link>
              </>
            ) : (
              <button
                onClick={() => { handleLogout(); setOpen(false); }}
                className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-sm text-white font-bold"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
