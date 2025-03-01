// ExpensePage.js
import  { useEffect } from "react";
import CreateForm from "./CreateForm"; // Assuming CreateForm is in the same directory
import ExpenseTable from "./ExpenseTable"; // Your table component
import useExpenseStore from "./store";

const ExpensePage = () => {
  const { fetchExpensesData, expenses } = useExpenseStore(); // Fetch data from the Zustand store

  useEffect(() => {
    fetchExpensesData(); // Call the fetch function on mount
  }, [fetchExpensesData]);

  return (
    <div className="container mx-auto p-4">
      <CreateForm /> {/* Add the form component */}
      <ExpenseTable expenses={expenses} /> {/* Pass the expenses as a prop */}
    </div>
  );
};

export default ExpensePage;
