import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";

// Example icons (aap apne backend icons ke hisaab se replace kar sakte ho)
const ICONS = ["💰", "🛒", "🏠", "🍔", "🎁", "🚗", "💡"];

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filterType, setFilterType] = useState("ALL");

  const [formData, setFormData] = useState({
    name: "",
    type: "EXPENSE",
    icon: ICONS[0], // default icon
  });

  // -------- FETCH BASED ON FILTER --------
  const loadCategories = async () => {
    try {
      let res;
      if (filterType === "ALL") {
        res = await axiosConfig.get("/categories");
      } else {
        res = await axiosConfig.get(`/categories/${filterType}`);
      }
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  // -------- HANDLE INPUT --------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // -------- SUBMIT (POST + PUT) --------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedCategory) {
        await axiosConfig.put(`/categories/${selectedCategory.id}`, formData);
      } else {
        await axiosConfig.post("/categories", formData);
      }
      setFormData({ name: "", type: "EXPENSE", icon: ICONS[0] });
      setSelectedCategory(null);
      loadCategories();
    } catch (err) {
      console.error("Error saving category", err);
    }
  };

  // -------- SELECT FOR UPDATE --------
  const handleEdit = (cat) => {
    setSelectedCategory(cat);
    setFormData({ name: cat.name, type: cat.type, icon: cat.icon || ICONS[0] });
  };

  // -------- CHANGE FILTER --------
  const handleFilter = (type) => {
    setFilterType(type);
  };

  useEffect(() => {
    loadCategories();
  }, [filterType]);

  return (
    <div className="max-w-3xl mx-auto p-4 mt-6 space-y-6">

      {/* FILTER BUTTONS */}
      <div className="flex gap-3">
        {["ALL", "INCOME", "EXPENSE"].map((type) => (
          <button
            key={type}
            onClick={() => handleFilter(type)}
            className={`px-4 py-2 rounded-md border ${
              filterType === type
                ? type === "INCOME"
                  ? "bg-emerald-600 text-white"
                  : type === "EXPENSE"
                  ? "bg-rose-600 text-white"
                  : "bg-indigo-600 text-white"
                : "bg-white text-slate-700"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* FORM CARD */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-5 space-y-4"
      >
        <h2 className="text-xl font-semibold text-slate-800">
          {selectedCategory ? "Update Category" : "Add Category"}
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Enter category name"
          value={formData.name}
          required
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
        >
          <option value="INCOME">INCOME</option>
          <option value="EXPENSE">EXPENSE</option>
        </select>

        <select
          name="icon"
          value={formData.icon}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
        >
          {ICONS.map((ic) => (
            <option key={ic} value={ic}>
              {ic}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-medium"
        >
          {selectedCategory ? "Update" : "Add"}
        </button>

        {selectedCategory && (
          <button
            type="button"
            onClick={() => {
              setSelectedCategory(null);
              setFormData({ name: "", type: "EXPENSE", icon: ICONS[0] });
            }}
            className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 py-2 rounded-md"
          >
            Cancel Edit
          </button>
        )}
      </form>

      {/* CATEGORY LIST */}
      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          {filterType === "ALL"
            ? "All Categories"
            : filterType === "INCOME"
            ? "Income Categories"
            : "Expense Categories"}
        </h2>

        {categories.length === 0 ? (
          <p className="text-slate-500 text-center">No categories found</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => handleEdit(cat)}
                className="p-4 border rounded-lg cursor-pointer hover:bg-slate-100 transition flex items-center gap-3"
              >
                <span className="text-2xl">{cat.icon || "💰"}</span>
                <div>
                  <p className="font-medium">{cat.name}</p>
                  <span
                    className={`inline-block mt-1 px-2 py-1 text-xs rounded ${
                      cat.type === "INCOME"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {cat.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
