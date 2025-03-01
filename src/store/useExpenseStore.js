// import { create } from "zustand";
// import axios from "axios";

// const API_BASE_URL = "http://localhost/dailyexpense_api/api";

// const useExpenseStore = create((set) => ({
//   expenses: [],
//   typesOfCost: [],
//   currencies: [],
//   loading: false,
//   error: null,

//   // Fetch data from all APIs
//   fetchExpensesData: async () => {
//     set({ loading: true });

//     try {
//       // Fetch expense list
//       const expenseResponse = await axios.get(`${API_BASE_URL}/get_expense_list.php`);

//       // Fetch cost types
//       const typesResponse = await axios.get(`${API_BASE_URL}/types_of_cost/get_types.php`);

//       // Fetch currencies
//       const currenciesResponse = await axios.get(`${API_BASE_URL}/currency/get_currencies.php`);

//       // Combine data (match cost type and currency with the expense list)
//       const combinedData = expenseResponse.data.map((expense) => {
//         // const costType = typesResponse.data.find((type) => type.id === expense.type_id);
//         const costType = typesResponse.data.find((type) => type.id.toString() === expense.type_id.toString());
//         const currency = currenciesResponse.data.find((cur) => cur.id === expense.currency);

//         return {
//           ...expense,
//         //   costType: costType ? costType.title : "Unknown",  // Type of expense (e.g., Food)
//         costTitle: costType ? costType.title : "Unknown",
//           currency: currency ? currency.short_name : "USD",  // Currency (e.g., USD)
//         };
//       });

//       set({ expenses: combinedData, loading: false });
//     } catch (error) {
//       set({ error: error.message, loading: false });
//     }
//   },
// }));

// export default useExpenseStore;


// store/useExpenseStore.js
import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = "http://localhost/dailyexpense_api/api";

// const useExpenseStore = create((set) => ({
//   expenses: [],
//   typesOfCost: [],
//   currencies: [],
//   loading: false,
//   error: null,

//   fetchExpensesData: async () => {
//     set({ loading: true });
//     try {
//       const expenseResponse = await axios.get(`${API_BASE_URL}/get_expense_list.php`);
//       const typesResponse = await axios.get(`${API_BASE_URL}/types_of_cost/get_types.php`);
//       const currenciesResponse = await axios.get(`${API_BASE_URL}/currency/get_currencies.php`);

//       const combinedData = expenseResponse.data.map((expense) => {
//         const costType = typesResponse.data.find((type) => type.id.toString() === expense.type_id.toString());
//         const currency = currenciesResponse.data.find((cur) => cur.id === expense.currency);

//         return {
//           ...expense,
//           costTitle: costType ? costType.title : "Unknown",
//           currency: currency ? currency.short_name : "USD",
//         };
//       });

//       set({ expenses: combinedData, loading: false });
//     } catch (error) {
//       set({ error: error.message, loading: false });
//     }
//   },

//   createExpense: async (newExpense) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/create_expense.php`, newExpense);
//       set((state) => ({ expenses: [...state.expenses, response.data] }));
//     } catch (error) {
//       set({ error: error.message });
//     }
//   },

//   updateExpense: async (id, updatedExpense) => {
//     try {
//       const response = await axios.put(`${API_BASE_URL}/update_expense.php`, { id, ...updatedExpense });
//       set((state) => ({
//         expenses: state.expenses.map((expense) =>
//           expense.id === id ? { ...expense, ...updatedExpense } : expense
//         ),
//       }));
//     } catch (error) {
//       set({ error: error.message });
//     }
//   },

//   deleteExpense: async (id) => {
//     try {
//       await axios.delete(`${API_BASE_URL}/delete_expense.php?id=${id}`);
//       set((state) => ({
//         expenses: state.expenses.filter((expense) => expense.id !== id),
//       }));
//     } catch (error) {
//       set({ error: error.message });
//     }
//   },
// }));

// store/useExpenseStore.js
const useExpenseStore = create((set) => ({
  expenses: [], // Ensure this is initialized as an empty array
  typesOfCost: [],
  currencies: [],
  loading: false,
  error: null,

  fetchExpensesData: async () => {
    set({ loading: true });
    try {
      const expenseResponse = await axios.get(`${API_BASE_URL}/get_expense_list.php`);
      const typesResponse = await axios.get(`${API_BASE_URL}/types_of_cost/get_types.php`);
      const currenciesResponse = await axios.get(`${API_BASE_URL}/currency/get_currencies.php`);

      const combinedData = expenseResponse.data.map((expense) => {
        const costType = typesResponse.data.find((type) => type.id.toString() === expense.type_id.toString());
        const currency = currenciesResponse.data.find((cur) => cur.id === expense.currency);

        return {
          ...expense,
          costTitle: costType ? costType.title : "Unknown",
          currency: currency ? currency.short_name : "USD",
        };
      });

      set({ expenses: combinedData, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));


export default useExpenseStore;
