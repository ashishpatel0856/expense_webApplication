import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosConfig from "../util/axiosConfig";
import Filter from "./Filter";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
  });
  const [transactions, setTransactions] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [loading, setLoading] = useState(true);

  const fullName = localStorage.getItem("fullName");

  // Load initial dashboard data
  const loadDashboard = async () => {
    try {
      const dashboardRes = await axiosConfig.get("/dashboard");
      setSummary({
        totalBalance: dashboardRes.data.totalBalance,
        totalIncome: dashboardRes.data.totalIncomes,
        totalExpenses: dashboardRes.data.totalExpenses,
      });
      setTransactions(dashboardRes.data.recentTransactions || []);
      setMonthly(dashboardRes.data.monthlyTrend || []); // if backend sends monthly data
    } catch (err) {
      console.error("Dashboard Load Error:", err);
      alert("Error loading dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading dashboard...
      </div>
    );
  }

  // Pie Chart: Income vs Expense
  const pieData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [summary.totalIncome, summary.totalExpenses],
        backgroundColor: ["#4ade80", "#f87171"],
      },
    ],
  };

  // Bar Chart: Monthly Trend
  const barData = {
    labels: monthly.map((m) => m.month),
    datasets: [
      {
        label: "Income",
        data: monthly.map((m) => m.income),
        backgroundColor: "#4ade80",
      },
      {
        label: "Expense",
        data: monthly.map((m) => m.expense),
        backgroundColor: "#f87171",
      },
    ],
  };

  // Handle filtered results from Filter component
  const handleFilterResult = (filteredData) => {
    setTransactions(filteredData);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ---------------- LEFT FIXED SIDEBAR ---------------- */}
      <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg p-6 fixed top-20 left-0 h-[calc(100vh-80px)]">
        <nav className="flex flex-col gap-4 mt-4">
          <Link className="px-4 py-2 bg-yellow-200 rounded font-bold" to="/dashboard">
            Dashboard
          </Link>
          <Link className="px-4 py-2 rounded hover:bg-yellow-100" to="/income">
            Income
          </Link>
          <Link className="px-4 py-2 rounded hover:bg-yellow-100" to="/expenses">
            Expenses
          </Link>
          <Link className="px-4 py-2 rounded hover:bg-yellow-100" to="/category">
            Category
          </Link>
          <Link className="px-4 py-2 rounded hover:bg-yellow-100" to="/filter">
            Filter
          </Link>
        </nav>
      </aside>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <main className="flex-1 p-6 md:ml-64 mt-20 overflow-y-auto h-screen">
        <h1 className="text-3xl font-semibold mb-1">Welcome, {fullName || "User"} 👋</h1>
        <p className="text-gray-500 mb-6">Your financial overview</p>

        {/* ---------- Summary Cards ---------- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-gray-600">Total Balance</h3>
            <p className="text-4xl font-semibold text-indigo-600 mt-2">₹{summary.totalBalance}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-gray-600">Total Income</h3>
            <p className="text-4xl font-semibold text-green-600 mt-2">₹{summary.totalIncome}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-gray-600">Total Expenses</h3>
            <p className="text-4xl font-semibold text-red-600 mt-2">₹{summary.totalExpenses}</p>
          </div>
        </div>

        {/* ---------- Charts ---------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Income vs Expense</h3>
            <Pie data={pieData} />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Monthly Trend</h3>
            <Bar data={barData} />
          </div>
        </div>

        {/* ---------- Filter Component ---------- */}
        <div className="mt-10">
          <Filter onResult={handleFilterResult} />
        </div>

        {/* ---------- Transactions Table ---------- */}
        <div className="mt-6 bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Transactions</h2>
          {transactions.length === 0 ? (
            <p className="text-gray-500">No transactions found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="p-3 text-left text-sm text-gray-500">Title</th>
                    <th className="p-3 text-left text-sm text-gray-500">Type</th>
                    <th className="p-3 text-left text-sm text-gray-500">Amount</th>
                    <th className="p-3 text-left text-sm text-gray-500">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr key={t.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{t.name || t.title}</td>
                      <td className="p-3 capitalize">{t.type}</td>
                      <td className={`p-3 font-bold ${t.type === "expense" ? "text-red-600" : "text-green-600"}`}>
                        {t.type === "expense" ? "-" : "+"}₹{t.amount}
                      </td>
                      <td className="p-3 text-gray-500">{new Date(t.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
