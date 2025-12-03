import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center">

      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-24 px-6 text-center">
        <h1 className="text-4xl font-extrabold mb-4 drop-shadow-lg">
          Manage Your Expenses Easily
        </h1>

        <p className="text-lg max-w-2xl mx-auto opacity-90">
          Track your daily spending, analyze your financial habits, and take control of your money with our smart expense tracker.
        </p>

        <Link to="/signup" className="mt-6 bg-white text-blue-700 font-semibold px-6 py-2 rounded-md shadow-lg hover:bg-gray-200">
          Get Started
        </Link>
      </div>
    
      {/* Features Section */}
      <div className="max-w-6xl w-full mt-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us?</h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">✨ Track Expenses</h3>
            <p className="text-gray-600">
              Add & categorize your expenses with ease. Stay organized daily.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">📊 Financial Insights</h3>
            <p className="text-gray-600">
              Get visual reports to understand where your money goes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">🔐 100% Secure</h3>
            <p className="text-gray-600">
              All your data is fully protected with secure authentication.
            </p>
          </div>

        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-20 mb-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Start Tracking Your Money Today</h2>
        <Link to="/signup" className="bg-blue-600 text-white font-medium px-6 py-2 rounded-md shadow-md hover:bg-blue-700">
          Create Free Account
        </Link>
      </div>

    </div>
   
  );
};

export default Home;
