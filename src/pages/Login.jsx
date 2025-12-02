import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo_bg from "../assets/logo_bg.jpg";
import Input from "../components/input";
import axiosConfig from "../util/axiosConfig.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required!");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await axiosConfig.post("/login", {
        email,
        password,
      });

      console.log("Login success:", response.data);

      // assuming backend returns: { token: "..." }
      localStorage.setItem("token", response.data.token);

      // Redirect to dashboard/home
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      <img
        src={logo_bg}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover filter blur-sm"
      />

      <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-semibold text-black text-center mb-2">
          Login to Your Account
        </h3>
        <p className="text-sm text-slate-700 text-center mb-8">
          Access your dashboard and manage your spendings.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="xyz@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

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
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-slate-800 text-center mt-6">
            Don’t have an account?
            <Link
              to="/signup"
              className="font-medium text-primary underline hover:text-primary-dark ml-1"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
