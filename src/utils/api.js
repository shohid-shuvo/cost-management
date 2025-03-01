import axios from "axios";

const API_BASE_URL = "http://localhost/dailyexpense_api/api/";

export const fetchExpenses = () => axios.get(`${API_BASE_URL}/costs`);

export const addExpense = (data) => axios.post(`${API_BASE_URL}/costs`, data);

export const updateExpense = (id, data) =>
  axios.put(`${API_BASE_URL}/costs/${id}`, data);

export const deleteExpense = (id) => axios.delete(`${API_BASE_URL}/costs/${id}`);

// utils/api.js
// import axios from "axios";

// const API_BASE_URL = "http://localhost/dailyexpense_api/api";

// export const fetchExpenses = () => axios.get(`${API_BASE_URL}/get_expense_list.php`);
// export const createExpense = (data) => axios.post(`${API_BASE_URL}/create_expense.php`, data);
// export const updateExpense = (id, data) => axios.put(`${API_BASE_URL}/update_expense.php`, { id, ...data });
// export const deleteExpense = (id) => axios.delete(`${API_BASE_URL}/delete_expense.php?id=${id}`);
