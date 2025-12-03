import React, { useEffect, useState } from "react";
import {  Link } from "react-router-dom";
import { getExpenses,deleteExpense } from "../../util/expenseApi";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  const loadExpenses = async () => {
    const res = await getExpenses;
    setExpenses(res.data);
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    loadExpenses();
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Expenses</h1>
        <Link to="/expenses/add" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Expense
        </Link>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Title</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Date</th>
            <th className="p-2">Category</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((exp) => (
            <tr key={exp.id} className="border">
              <td className="p-2">{exp.title}</td>
              <td className="p-2">{exp.amount}</td>
              <td className="p-2">{exp.date}</td>
              <td className="p-2">{exp.category}</td>
              <td className="p-2">
                <Link
                  to={`/expenses/edit/${exp.id}`}
                  className="text-blue-600 mr-3"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
