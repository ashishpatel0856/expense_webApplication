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
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const Dashboard = () => {
  // fetch name from local
  const fullName = localStorage.getItem("fullName");

  const [summary, setSummary] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
  });
  const [transactions, setTransactions] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [loading, setLoading] = useState(true);

  // sidebar toggle (mobile)
  const [openSidebar, setOpenSidebar] = useState(false);

  const loadDashboard = async () => {
    try {
      const res = await axiosConfig.get("/dashboard");
      setSummary({
        totalBalance: res.data.totalBalance,
        totalIncome: res.data.totalIncomes,
        totalExpenses: res.data.totalExpenses,
      });
      setTransactions(res.data.recentTransactions || []);
      setMonthly(res.data.monthlyTrend || []);
    } catch (err) {
      console.log(err);
      alert("Failed to load dashboard");
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
        Loading...
      </div>
    );
  }

  const pieData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [summary.totalIncome, summary.totalExpenses],
        backgroundColor: ["#22c55e", "#f43f5e"],
      },
    ],
  };

  const barData = {
    labels: monthly.map((m) => m.month),
    datasets: [
      {
        label: "Income",
        data: monthly.map((m) => m.income),
        backgroundColor: "#22c55e",
      },
      {
        label: "Expense",
        data: monthly.map((m) => m.expense),
        backgroundColor: "#f43f5e",
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 to-gray-100">

      {/* MOBILE SIDEBAR TOGGLE BUTTON */}
      <button
        onClick={() => setOpenSidebar(true)}
        className="md:hidden fixed top-4 left-4 z-50 dark:bg-indigo-600 text-white p-2 rounded-full shadow-lg"
      >
        <Menu size={22} />
      </button>

      {/* SIDEBAR (desktop + mobile) */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 
          dark:bg-gray-800 backdrop-blur-xl shadow-xl border-r border-white/50 
          p-6 z-40 transition-transform duration-300
          ${openSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* close button for mobile */}
        <button
          onClick={() => setOpenSidebar(false)}
          className="md:hidden absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full"
        >
          <X size={22} />
        </button>

        <h1 className="text-2xl font-bold text-indigo-700 tracking-wide mb-8">
          Finance App
        </h1>

        <nav className="flex flex-col gap-4 text-gray-700 font-medium">
          <Link
            to="/dashboard"
            className="px-4 py-2 rounded-xl bg-indigo-800 text-white shadow"
          >
            Dashboard
          </Link>
          <Link to="/income" className="px-4 py-2 text-white rounded-xl hover:bg-indigo-200">
            Income
          </Link>
          <Link to="/expenses" className="px-4 py-2 text-white rounded-xl hover:bg-indigo-200">
            Expenses
          </Link>
          <Link to="/category" className="px-4 py-2 text-white rounded-xl hover:bg-indigo-200">
            Category
          </Link>
          <Link to="/filter" className="px-4 py-2 text-white rounded-xl hover:bg-indigo-200">
            Filter
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 md:ml-64 p-6 sm:p-8 mt-10 md:mt-0">
        <h2 className="text-3xl font-semibold text-gray-800">
          Welcome, {fullName || "User"} 👋
        </h2>

        <p className="text-gray-600 mb-10">Here is your financial overview</p>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { title: "Total Balance", value: summary.totalBalance, color: "text-indigo-600" },
            { title: "Total Income", value: summary.totalIncome, color: "text-green-600" },
            { title: "Total Expenses", value: summary.totalExpenses, color: "text-red-600" },
          ].map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/50"
            >
              <h3 className="text-gray-600">{c.title}</h3>
              <p className={`text-4xl font-bold mt-3 ${c.color}`}>₹{c.value}</p>
            </motion.div>
          ))}
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
          <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow border border-white/40">
            <h3 className="text-lg font-semibold mb-4">Income vs Expense</h3>
            <Pie data={pieData} />
          </div>

          <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow border border-white/40">
            <h3 className="text-lg font-semibold mb-4">Monthly Trend</h3>
            <Bar data={barData} />
          </div>
        </div>

        {/* FILTER SECTION */}
        <div className="mt-10">
          <Filter onResult={(data) => setTransactions(data)} />
        </div>

        {/* TRANSACTIONS TABLE */}
        <div className="mt-10 bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow border border-white/40">
          <h3 className="text-xl font-semibold mb-4">Transactions</h3>

          {!transactions.length ? (
            <p className="text-gray-500">No transactions found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full rounded-xl overflow-hidden border border-gray-200">
                <thead className="bg-indigo-50">
                  <tr>
                    <th className="p-3 text-left text-gray-600">Title</th>
                    <th className="p-3 text-left text-gray-600">Type</th>
                    <th className="p-3 text-left text-gray-600">Amount</th>
                    <th className="p-3 text-left text-gray-600">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {transactions.map((t) => (
                    <tr
                      key={t.id}
                      className="border-b hover:bg-indigo-100/40 transition"
                    >
                      <td className="p-3">{t.name || t.title}</td>
                      <td className="p-3 capitalize">{t.type}</td>
                      <td
                        className={`p-3 font-semibold ${
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
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
