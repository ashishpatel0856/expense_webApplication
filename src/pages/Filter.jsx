import { useState } from "react";
import axiosConfig from "../util/axiosConfig";

export default function Filter({ onResult }) {
  const [filters, setFilters] = useState({
    type: "expense",
    startDate: "",
    endDate: "",
    keyword: "",
    sortField: "date",
    sortOrder: "desc",
  });

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
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
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
