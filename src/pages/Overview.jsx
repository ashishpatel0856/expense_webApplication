import React from "react";

const Overview = ({ summary }) => {
  if (!summary) return null;

  return (
    <div className="bg-white p-6 shadow rounded-xl border">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Overview</h3>

      <div className="space-y-3">
        <div>
          <p className="text-gray-500">Total Income</p>
          <p className="text-xl font-bold text-green-600">₹{summary.totalIncome}</p>
        </div>

        <div>
          <p className="text-gray-500">Total Expense</p>
          <p className="text-xl font-bold text-red-600">₹{summary.totalExpenses}</p>
        </div>

        <div>
          <p className="text-gray-500">Balance</p>
          <p className="text-xl font-bold text-indigo-600">₹{summary.totalBalance}</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
