import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";


export default function Income() {
  const [incomes, setIncomes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    categoryId: "",
    date: "",
    icon: "💰",
  });
  const [openSidebar,setOpenSidebar]=useState(false)
  const [loading, setLoading] = useState(true);

  // Available icons
  const ICONS = ["💰","🏦","🎁","💡","🏠","🚗","🛒","🍔","🎉","🛍️"];

  // -------- FETCH INCOMES --------
  const loadIncomes = async () => {
    try {
      setLoading(true);
      const res = await axiosConfig.get("/Incomes");
      setIncomes(res.data);
    } catch (err) {
      console.error("Error fetching incomes", err);
    } finally {
      setLoading(false);
    }
  };

  // -------- FETCH CATEGORIES --------
  const loadCategories = async () => {
    try {
      const res = await axiosConfig.get("/categories/INCOME");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  // -------- HANDLE INPUT --------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // -------- PICK RANDOM ICON --------
  const pickRandomIcon = () => {
    const randomIcon = ICONS[Math.floor(Math.random() * ICONS.length)];
    setFormData({ ...formData, icon: randomIcon });
  };

  // -------- SUBMIT (POST) --------
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosConfig.post("/Incomes", formData);
      setFormData({ name: "", amount: "", categoryId: "", date: "", icon: "💰" });
      loadIncomes();
    } catch (err) {
      console.error("Error adding income", err);
    }
  };

  // -------- DELETE --------
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this income?")) {
      try {
        await axiosConfig.delete(`/Incomes/${id}`);
        loadIncomes();
      } catch (err) {
        console.error("Error deleting income", err);
      }
    }
  };

  useEffect(() => {
    loadIncomes();
    loadCategories();
  }, []);

  
  return (
    <div className="max-w-4xl mx-auto p-4 mt-6 space-y-6">

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
         <h1 className="text-2xl font-bold text-indigo-700 tracking-wide mb-8 mt-12">
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
      {/* FORM CARD */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-5 space-y-4"
      >
        <h2 className="text-xl font-semibold text-slate-800">Add Income</h2>

        <input
          type="text"
          name="name"
          placeholder="Income Name"
          value={formData.name}
          required
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          required
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
        />

        {/* CATEGORY DROPDOWN */}
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name} {cat.icon ? `(${cat.icon})` : ""}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          value={formData.date}
          required
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
        />

        <div className="flex gap-3">
          <select
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
          >
            {ICONS.map((ic) => (
              <option key={ic} value={ic}>
                {ic}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={pickRandomIcon}
          >
           
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-medium"
        >
          Add Income
        </button>
      </form>

      {/* INCOME LIST */}
      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Current Month Incomes</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : incomes.length === 0 ? (
          <p className="text-center text-gray-500">No incomes found</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3">
            {incomes.map((inc) => (
              <div
                key={inc.id}
                className="p-4 border rounded-lg flex justify-between items-center hover:bg-slate-100 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{inc.icon || "💰"}</span>
                  <div>
                    <p className="font-medium">{inc.name}</p>
                    <div className="flex "><p >Amount:</p>
                    <p><FaIndianRupeeSign className="text-gray-600 size-4 mt-1 "/></p>
                    <p className="text-base text-gray-500 ">
                        {inc.amount}  
                    </p>
                    </div>
                        <p className="text-sm text-gray-500 mb-1"> Category: {inc.categoryName} {inc.icon ? `(${inc.icon})` : ""}</p>
                    <p className="text-xs text-gray-400">
                      Date: {new Date(inc.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(inc.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
