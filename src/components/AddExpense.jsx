import { useState } from "react";
import useExpenseStore from "../store/useExpenseStore";

const AddExpense = () => {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const { addExpense } = useExpenseStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !note) return;
    addExpense({ amount, note, type_id: 1, payment_method_id: 1, status: 1 });
    setAmount("");
    setNote("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Expense</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Add Expense
      </button>
    </form>
  );
};

export default AddExpense;
