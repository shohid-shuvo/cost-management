// components/ExpensePage.jsx
import React, { useEffect } from "react";
import useExpenseStore from "../store/useExpenseStore";
import ExpenseTable from "./ExpenseTable";
import CreateForm from "./CreateForm";

const ExpensePage = () => {
  const { expenses, fetchExpensesData } = useExpenseStore();

  useEffect(() => {
    fetchExpensesData(); // Fetch data on page load
  }, [fetchExpensesData]);

  return (
    <div className="container mx-auto p-4">
      <ExpenseTable expenses={expenses} />
    </div>
  );
};

export default ExpensePage;
