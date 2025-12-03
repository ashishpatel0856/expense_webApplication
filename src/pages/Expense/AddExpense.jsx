import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addExpense } from "../../util/expenseApi";

const AddExpense = () => {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    description: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addExpense(form);
    navigate("/expenses");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Expense</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>

        <input className="border p-2 w-full" name="title" placeholder="Title" onChange={handleChange} />

        <input className="border p-2 w-full" name="amount" placeholder="Amount" onChange={handleChange} />

        <input className="border p-2 w-full" name="category" placeholder="Category" onChange={handleChange} />

        <input className="border p-2 w-full" name="date" type="date" onChange={handleChange} />

        <textarea className="border p-2 w-full" name="description" placeholder="Description" onChange={handleChange} />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
