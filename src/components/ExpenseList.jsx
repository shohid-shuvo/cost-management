import React, { useEffect } from "react";
import useExpenseStore from "../store/useExpenseStore"; // Import Zustand store

const ExpenseTable = () => {
  const { expenses, loading, error, fetchExpensesData } = useExpenseStore();

  useEffect(() => {
    fetchExpensesData(); // Fetch data when the component mounts
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Serial</th>
            <th className="px-6 py-3">Cost Title</th>
            <th className="px-6 py-3">Amount</th>
            <th className="px-6 py-3">Currency</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={expense.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{expense.costTitle}</td>
              <td className="px-6 py-4">{expense.amount}</td>
              <td className="px-6 py-4">{expense.currencyShort}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
