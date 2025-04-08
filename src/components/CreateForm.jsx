// components/CreateForm.jsx
import React, { useState, useEffect } from "react";
import useExpenseStore from "../store/useExpenseStore";

const CreateForm = ({ expenseToEdit, closeForm }) => {
  const { createExpense, updateExpense } = useExpenseStore();
  const [formData, setFormData] = useState({
    costTitle: "",
    amount: "",
    currency: "",
    note: "",
  });

  useEffect(() => {
    if (expenseToEdit) {
      setFormData({
        costTitle: expenseToEdit.costTitle,
        amount: expenseToEdit.amount,
        currency: expenseToEdit.currency,
        note: expenseToEdit.note,
      });
    }
  }, [expenseToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (expenseToEdit) {
      updateExpense(expenseToEdit.id, formData);
    } else {
      createExpense(formData);
    }
    closeForm();
  };

  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <h2 className="text-xl font-semibold">{expenseToEdit ? "Edit Expense" : "Add Expense"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label className="block">Cost Title</label>
          <input
            type="text"
            name="costTitle"
            value={formData.costTitle}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block">Currency</label>
          <input
            type="text"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block">Note</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {expenseToEdit ? "Update" : "Create"}
          </button>
          <button
            type="button"
            onClick={closeForm}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
