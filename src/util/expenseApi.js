import axiosConfig from "./axiosConfig";


export const getExpenses = () => axiosConfig.get("/expenses");

export const getExpenseById = (id) => axiosConfig.get(`/expenses/${id}`);

export const addExpense = (data) => axiosConfig.post("/expenses", data);

export const updateExpense = (id, data) => axiosConfig.put(`/expenses/${id}`, data);

export const deleteExpense = (id) => axiosConfig.delete(`/expenses/${id}`);
