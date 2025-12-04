import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosConfig from "../util/axiosConfig";
import Overview from "./Overview";
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
  const [recent, setRecent] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [loading, setLoading] = useState(true);

  const fullName = localStorage.getItem("fullName");

  const loadDashboard = async () => {
    try {
      const summaryRes = await axiosConfig.get("/dashboard/summary");
      const recentRes = await axiosConfig.get("/transactions/recent");
      const monthlyRes = await axiosConfig.get("/dashboard/monthly");

      setSummary(summaryRes.data);
      setRecent(recentRes.data);
      setMonthly(monthlyRes.data);
    } catch (err) {
      console.error(err);
      alert("Error loading dashboard");
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

  // ---------- Chart Data ----------
  const pieData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [summary.totalIncome, summary.totalExpenses],
        backgroundColor: ["#4ade80", "#f87171"],
        borderWidth: 1,
      },
    ],
  };

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

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* -------- Sidebar -------- */}
      <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg p-6 fixed top-16 left-0 h-[calc(100vh-64px)]">
        <nav className="flex flex-col gap-4 mt-4">
          <Link to="/dashboard" className="px-4 py-2 bg-yellow-200 rounded font-bold">
            Dashboard
          </Link>
          <Link to="/income" className="px-4 py-2 rounded hover:bg-yellow-100">
            Income
          </Link>
          <Link to="/expenses" className="px-4 py-2 rounded hover:bg-yellow-100">
            Expenses
          </Link>
          <Link to="/category" className="px-4 py-2 rounded hover:bg-yellow-100">
            Category
          </Link>
          <Link to="/filter" className="px-4 py-2 rounded hover:bg-yellow-100">
            Filter
          </Link>
        </nav>
      </aside>

      {/* -------- Main Content -------- */}
      <main className="flex-1 p-6 md:ml-64 mt-16">
        <h1 className="text-3xl font-semibold mb-2">
          Welcome, {fullName || "User"} 👋
        </h1>
        <p className="text-gray-500">Here is your financial overview</p>

        {/* -------- Summary Cards -------- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 shadow rounded-xl border">
            <h3 className="text-lg text-gray-600">Total Balance</h3>
            <p className="text-3xl font-bold text-indigo-600">₹{summary.totalBalance}</p>
          </div>
          <div className="bg-white p-6 shadow rounded-xl border">
            <h3 className="text-lg text-gray-600">Total Income</h3>
            <p className="text-3xl font-bold text-green-600">₹{summary.totalIncome}</p>
          </div>
          <div className="bg-white p-6 shadow rounded-xl border">
            <h3 className="text-lg text-gray-600">Total Expenses</h3>
            <p className="text-3xl font-bold text-red-600">₹{summary.totalExpenses}</p>
          </div>
        </div>

        {/* -------- Charts -------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
          <div className="bg-white p-6 shadow rounded-xl border">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Income vs Expense</h3>
            <Pie data={pieData} />
          </div>

          <div className="bg-white p-6 shadow rounded-xl border">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Monthly Trend</h3>
            <Bar data={barData} />
          </div>
        </div>

        {/* -------- Recent Transactions -------- */}
        <div className="mt-10 bg-white p-6 shadow rounded-xl border">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>

          {recent.length === 0 ? (
            <p className="text-gray-500">No recent activity</p>
          ) : (
            <table className="min-w-full border-t">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="p-3 text-left text-sm text-gray-500">Title</th>
                  <th className="p-3 text-left text-sm text-gray-500">Type</th>
                  <th className="p-3 text-left text-sm text-gray-500">Amount</th>
                  <th className="p-3 text-left text-sm text-gray-500">Date</th>
                </tr>
              </thead>

              <tbody>
                {recent.map((t) => (
                  <tr key={t.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{t.title}</td>
                    <td className="p-3 capitalize">{t.type}</td>
                    <td
                      className={`p-3 font-bold ${
                        t.type === "expense" ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {t.type === "expense" ? "-" : "+"}₹{t.amount}
                    </td>
                    <td className="p-3 text-gray-500">
                      {new Date(t.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* -------- Right Overview Panel -------- */}
      <aside className="hidden md:block w-64 p-6 mt-16">
        <Overview summary={summary} />
      </aside>
    </div>
  );
};

export default Dashboard;
