import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
export default function Expense() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSidebar,setOpenSidebar]=useState(false)

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    categoryId: "",
    date: "",
    icon: "",
  });

  // Random icons for expense
  const ICONS = ["💸", "🛒", "🍔", "🚗", "🏠", "📱", "🛍️", "🎉", "🍕", "⚡"];

  // Use random icon by default
  const setRandomDefaultIcon = () => {
    const icon = ICONS[Math.floor(Math.random() * ICONS.length)];
    setFormData((prev) => ({ ...prev, icon }));
  };

  // Fetch monthly expenses
  const loadExpenses = async () => {
    try {
      setLoading(true);
      const res = await axiosConfig.get("/expenses");
      setExpenses(res.data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories for dropdown (Expense only)
  const loadCategories = async () => {
    try {
      const res = await axiosConfig.get("/categories/EXPENSE");
      setCategories(res.data);
    } catch (err) {
      console.error("Error loading categories", err);
    }
  };

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Random icon button
  const pickRandomIcon = () => {
    const random = ICONS[Math.floor(Math.random() * ICONS.length)];
    setFormData({ ...formData, icon: random });
  };

  // Add expense
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.icon) {
      setRandomDefaultIcon();
    }

    try {
      await axiosConfig.post("/expenses", formData);
      setFormData({
        name: "",
        amount: "",
        categoryId: "",
        date: "",
        icon: "",
      });

      loadExpenses();
    } catch (err) {
      console.error("Error adding expense:", err);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm("Delete this expense?")) {
      try {
        await axiosConfig.delete(`/expenses/${id}`);
        loadExpenses();
      } catch (err) {
        console.error("Error deleting:", err);
      }
    }
  };

  useEffect(() => {
    loadExpenses();
    loadCategories();
    setRandomDefaultIcon();
  }, []);

  return (
    <div className="max-w-5xl mx-auto   text-gray-800 p-4 mt-6 space-y-6">


       <button
        onClick={() => setOpenSidebar(true)}
        className="md:hidden fixed top-4 left-4 z-50 dark:bg-indigo-600 text-white p-2 rounded-full shadow-lg"
      ><Menu size={22}/></button>
       <aside
        className={`
          fixed top-0 left-0 h-full w-64 
          dark:bg-gray-800 backdrop-blur-xl shadow-xl border-r border-white/50 
          p-6 z-40 transition-transform duration-300
          ${openSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
         <h1 className="text-2xl font-bold text-white tracking-wide mb-8 mt-12">
          Finance App
        </h1>
          <nav className="flex flex-col gap-4 text-gray-700 font-medium">
          <Link
            to="/dashboard"
            className="px-4 py-2 rounded-xl bg-indigo-800 text-white shadow"
          >
            Dashboard
          </Link>
          <Link to="/income" className="px-4 py-2  text-white rounded-xl hover:bg-indigo-200">
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
      {/* ADD EXPENSE FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg rounded-xl space-y-4"
      >
        <h2 className="text-xl font-semibold text-gray-800">Add Expense</h2>

        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Expense Name"
          className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-red-400"
        />

        <input
          type="number"
          name="amount"
          required
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-red-400"
        />

        <select
          name="categoryId"
          required
          value={formData.categoryId}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-red-400"
        >
          <option value="">Select Category</option>

          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          required
          value={formData.date}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-red-400"
        />

        {/* ICON PICKER */}
        <div className="flex gap-3 items-center">
          <select
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-red-400 flex-1"
          >
            {ICONS.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={pickRandomIcon}
            className="px-4 py-2 text-white rounded-md"
          >
            
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Add Expense
        </button>
      </form>

      {/* MONTHLY EXPENSES LIST */}
      <div className="bg-white p-6 shadow-lg rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : expenses.length === 0 ? (
          <p className="text-center text-gray-500">No expenses found this month</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {expenses.map((exp) => (
              <div
                key={exp.id}
                className="p-4 border rounded-xl flex justify-between hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{exp.icon}</span>

                  <div>
                    <p className="font-semibold text-gray-900">{exp.name}</p>
                    <div className="flex ">
                      <FaIndianRupeeSign className="text-gray-700 mt-1 h-3"/>
                       <p className="text-gray-600 text-sm ">
                      {exp.amount} • {exp.categoryName}
                    </p>
                    </div>
                    
                    <p className="text-xs text-gray-400">
                      {new Date(exp.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

               <div>
                 <button
                  onClick={() => handleDelete(exp.id)}
                  className="bg-red-600 hover:bg-red-700 px-5 py-1 text-white rounded-md">
                  Delete
                </button>
               </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
