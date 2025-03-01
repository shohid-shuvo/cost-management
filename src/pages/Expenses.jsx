import AddExpense from "../components/AddExpense";
import ExpenseList from "../components/ExpenseList";

const Expenses = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Expense Management</h1>
      <AddExpense />
      <ExpenseList />
    </div>
  );
};

export default Expenses;


