import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosConfig from "../util/axiosConfig.jsx";
import Overview from "./Overview.jsx";

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fullName = localStorage.getItem("fullName");

  const fetchDashboardData = async () => {
    try {
      const summaryRes = await axiosConfig.get("/dashboard/summary");
      const transactionRes = await axiosConfig.get("/transactions/recent");

      setSummary(summaryRes.data);
      setTransactions(transactionRes.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading dashboard...
      </div>
    );
  }

  return (
   <div className="flex min-h-screen bg-gray-100">
  {/* Fixed Sidebar below navbar */}
  <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg p-6 fixed top-16 left-0 h-[calc(100vh-64px)] z-20">
    <nav className="flex flex-col gap-4 mt-6">
      <Link
        to="/dashboard"
        className="px-4 py-2 rounded hover:bg-yellow-100 bg-yellow-200 font-extrabold"
      >
        Dashboard
      </Link>
      <Link
        to="/income"
        className="px-4 py-2 rounded hover:bg-yellow-100 font-medium"
      >
        Income
      </Link>
      <Link
        to="/expenses"
        className="px-4 py-2 rounded hover:bg-yellow-100 font-medium"
      >
        Expenses
      </Link>
      <Link
        to="/category"
        className="px-4 py-2 rounded hover:bg-yellow-100 font-medium"
      >
        Category
      </Link>
      <Link
        to="/filter"
        className="px-4 py-2 rounded hover:bg-yellow-100 font-medium"
      >
        Filter
      </Link>
    </nav>
  </aside>

  {/* Main content offset for sidebar and navbar */}
  <main className="flex-1 p-6 md:ml-64 mt-16">
    <h1 className="text-3xl font-semibold text-gray-900 mb-4">
      Welcome, {fullName || "User"} 👋
    </h1>

    {/* Summary Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-medium text-gray-700">Total Balance</h3>
        <p className="text-3xl font-bold text-green-600 mt-2">
          ₹{summary.totalBalance}
        </p>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-medium text-gray-700">Total Income</h3>
        <p className="text-3xl font-bold text-blue-600 mt-2">
          ₹{summary.totalIncome}
        </p>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-medium text-gray-700">Total Expenses</h3>
        <p className="text-3xl font-bold text-red-600 mt-2">
          ₹{summary.totalExpenses}
        </p>
      </div>
    </div>

    {/* Recent Transactions */}
    <div className="mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Recent Transactions
      </h2>
      <div className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-x-auto">
        {transactions.length === 0 ? (
          <p className="text-center py-6 text-gray-500">No transactions found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 capitalize">
                    {item.type}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap font-semibold ${
                      item.type === "expense" ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {item.type === "expense" ? "-" : "+"}₹{item.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  </main>

  {/* Mini dashboard on right */}
  <aside className="hidden md:block w-64 p-6">
    <Overview />
  </aside>
</div>

  );
};

export default Dashboard;
