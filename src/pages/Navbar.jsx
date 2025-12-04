import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import icon from "../assets/logo-icon.png";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    navigate("/login");
  };

  const isDashboard = location.pathname === "/dashboard";

  const handleDashboardClick = (e) => {
    e.preventDefault();
    token ? navigate("/dashboard") : navigate("/signup");
  };

  return (
    <nav className="w-full bg-white text-black py-4 shadow-lg fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LEFT - Logo */}
        <div className="flex items-center gap-2">
          <img src={icon} alt="logo" className="w-12 h-12 object-contain" />
          <h1 className="font-extrabold text-black text-lg">Money Manager</h1>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* CENTER + RIGHT (Desktop) */}
        <div className="hidden md:flex items-center gap-16">
          {/* Center Links */}
          <div className="flex gap-8">
            <Link to="/home" className="hover:text-yellow-300 font-semibold">Home</Link>
            <Link to="/about" className="hover:text-yellow-300 font-semibold">About us</Link>
            <Link to="/contact" className="hover:text-yellow-300 font-semibold">Contact us</Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {!token ? (
              <>
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
                  className="hover:text-yellow-300 font-bold px-4 py-1 rounded-sm border border-gray-300"
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
                className="hover:text-yellow-300 font-bold bg-blue-600 rounded-sm px-4 py-1 text-white"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* MOBILE MENU PANEL */}
        {open && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center gap-4 py-4 md:hidden">

            {/* Center links mobile */}
            <Link onClick={() => setOpen(false)} to="/home" className="hover:text-yellow-300 font-semibold">
              Home
            </Link>
            <Link onClick={() => setOpen(false)} to="/about" className="hover:text-yellow-300 font-semibold">
              About us
            </Link>
            <Link onClick={() => setOpen(false)} to="/contact" className="hover:text-yellow-300 font-semibold">
              Contact us
            </Link>

            {/* Auth Buttons mobile */}
            {!token ? (
              <>
                {!isDashboard && (
                  <button
                    onClick={(e) => { handleDashboardClick(e); setOpen(false); }}
                    className="hover:text-yellow-300 bg-blue-700 px-4 py-1 rounded-sm font-bold text-white"
                  >
                    Dashboard
                  </button>
                )}
                <Link
                  onClick={() => setOpen(false)}
                  to="/login"
                  className="hover:text-yellow-300 font-bold px-4 py-1 rounded-sm border border-gray-300"
                >
                  Login
                </Link>

                <Link
                  onClick={() => setOpen(false)}
                  to="/signup"
                  className="hover:text-yellow-300 bg-blue-500 px-4 py-1 rounded-sm font-bold text-white"
                >
                  Get Start
                </Link>
              </>
            ) : (
              <button
                onClick={() => { handleLogout(); setOpen(false); }}
                className="hover:text-yellow-300 font-bold bg-blue-600 rounded-sm px-4 py-1 text-white"
              >
                Logout
              </button>
            )}

          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
