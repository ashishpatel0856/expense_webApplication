import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getExpenseById ,updateExpense} from "../../util/expenseApi";

const EditExpense = () => {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const res = await getExpenseById(id);
      setForm(res.data);
    }
    load();
  }, [id]);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateExpense(id, form);
    navigate("/expenses");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Expense</h1>

      <form className="space-y-4" onSubmit={handleUpdate}>
        <input className="border p-2 w-full" name="title" value={form.title || ""} onChange={handleChange} />

        <input className="border p-2 w-full" name="amount" value={form.amount || ""} onChange={handleChange} />

        <input className="border p-2 w-full" name="category" value={form.category || ""} onChange={handleChange} />

        <input className="border p-2 w-full" name="date" type="date" value={form.date || ""} onChange={handleChange} />

        <textarea className="border p-2 w-full" name="description" value={form.description || ""} onChange={handleChange} />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
};

export default EditExpense;
