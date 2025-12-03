import React from "react";

const About = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">

        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          About Money Manager
        </h1>

        <p className="text-gray-600 max-w-3xl mx-auto text-lg mb-12">
          Money Manager is a smart and simple expense-tracking application 
          designed to help you take full control of your personal finances. 
          Our goal is to make money management effortless, intuitive, and powerful.
        </p>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-10">

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">📱 Easy to Use</h3>
            <p className="text-gray-600">
              A clean and user-friendly interface designed for everyone.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-purple-600 mb-2">📊 Smart Insights</h3>
            <p className="text-gray-600">
              Track expenses, view analytics, and make better money decisions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-green-600 mb-2">🔐 Secure</h3>
            <p className="text-gray-600">
              Your financial data is encrypted and always safe.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default About;
