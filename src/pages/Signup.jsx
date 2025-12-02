import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo_bg from "../assets/logo_bg.jpg";
import Input from '../components/input';
import { Link } from "react-router-dom";
import axiosConfig from "../util/axiosConfig.jsx";

const Signup = () => {
  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    console.log("Form submit triggered"); // check if submit works

    //  validation
    if (!fullName || !email || !password) {
      setError("All fields are required!");
      return;
    }

    setError(null); // clear previous errors
    setLoading(true); // show loading state

    try {
      // POST request to backend
      const response = await axiosConfig.post("/register", {
        fullName,
        email,
        password,
      });

      console.log("Signup success:", response.data); 

      // Clear form fields
      setFullName("");
      setEmail("");
      setPassword("");

      // Redirect to login page after success
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false); // hide loading state
    }
  };

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      <img
        src={logo_bg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover filter blur-sm"
      />

      {/* Signup form container */}
      <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-semibold text-black text-center mb-2">
          Create An Account
        </h3>
        <p className="text-sm text-slate-700 text-center mb-8">
          Start tracking your spendings by joining with us.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              label="Full Name"
              placeholder="John Doe"
              type="text"
            />

            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="xyz@example.com"
              type="text"
            />

            <div className="col-span-2">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                placeholder="*********"
                type="password"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-700 text-white rounded-md w-full py-3 text-lg font-medium hover:bg-blue-800 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          {/* Link to login */}
          <p className="text-sm text-slate-800 text-center mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary underline hover:text-primary-dark ml-1"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
