import { useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
export default function Filter({ onResult }) {
  const [filters, setFilters] = useState({
    type: "expense",
    startDate: "",
    endDate: "",
    keyword: "",
    sortField: "date",
    sortOrder: "desc",
  });
const [openSidebar,setOpenSidebar]=useState(false)
  const SORT_FIELDS = [
    { value: "date", label: "Date" },
    { value: "amount", label: "Amount" },
    { value: "name", label: "Name" },
    { value: "categoryName", label: "Category" },
  ];

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosConfig.post("/filter", filters);
      onResult(res.data);
    
    } catch (err) {
      console.error("Filter Error:", err);
      alert("Error fetching filtered transactions");
    }
  };

  return (
    <div className=" shadow-md rounded-lg p-4 mt-6 mb-4">
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
      <h2 className="text-xl font-semibold mb-3">Filter Transactions</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>

        {/* Type */}
        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="p-2 border rounded-md"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        {/* Keyword */}
        <input
          type="text"
          name="keyword"
          value={filters.keyword}
          placeholder="Search by name/category"
          onChange={handleChange}
          className="p-2 border rounded-md"
        />

        {/* Start Date */}
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />

        {/* End Date */}
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />

        {/* Sort Field */}
        <select
          name="sortField"
          value={filters.sortField}
          onChange={handleChange}
          className="p-2 border rounded-md"
        >
          {SORT_FIELDS.map((sf) => (
            <option key={sf.value} value={sf.value}>
              {sf.label}
            </option>
          ))}
        </select>

        {/* Sort Order */}
        <select
          name="sortOrder"
          value={filters.sortOrder}
          onChange={handleChange}
          className="p-2 border rounded-md"
        >
          <option value="asc">Ascending (ASC)</option>
          <option value="desc">Descending (DESC)</option>
        </select>

        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </form>
    </div>
  );
}
