import  { useEffect } from "react";
import useExpenseStore from "../store/useExpenseStore";

const ExpenseTable = () => {
  const { expenses, loading, error, fetchExpensesData } = useExpenseStore();

  // Fetch data when the component mounts
  useEffect(() => {
    fetchExpensesData();
  }, [fetchExpensesData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <span className="text-xl text-gray-700">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-10">
        <span className="text-xl text-red-500">Error: {error}</span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto shadow-lg sm:rounded-lg w-[80vw]">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 text-left font-medium text-gray-900">
              Serial
            </th>
            <th scope="col" className="px-6 py-4 text-left font-medium text-gray-900">
              Cost Title
            </th>
            <th scope="col" className="px-6 py-4 text-left font-medium text-gray-900">
              Amount
            </th>
            <th scope="col" className="px-6 py-4 text-left font-medium text-gray-900">
              Currency
            </th>
            <th scope="col" className="px-6 py-4 text-left font-medium text-gray-900">
              Note
            </th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr
              key={expense.id}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } border-b hover:bg-gray-100 transition duration-200 ease-in-out`}
            >
              <td className="px-6 py-4 text-gray-900">{index + 1}</td>
              <td className="px-6 py-4 text-gray-900">{expense.costTitle}</td>
              <td className="px-6 py-4 text-gray-900">{expense.amount}</td>
              <td className="px-6 py-4 text-gray-900">{expense.currency}</td>
              <td className="px-6 py-4 text-gray-900">{expense.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;



// import React, { useState } from "react";
// import useExpenseStore from "../store/useExpenseStore";
// import CreateForm from "./CreateForm";

// // components/ExpenseTable.jsx
// const ExpenseTable = ({ expenses }) => {
//   const [expenseToEdit, setExpenseToEdit] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const { deleteExpense } = useExpenseStore();

//   const handleDelete = (id) => {
//     deleteExpense(id);
//   };

//   const handleEdit = (expense) => {
//     setExpenseToEdit(expense);
//     setShowForm(true);
//   };

//   const closeForm = () => {
//     setExpenseToEdit(null);
//     setShowForm(false);
//   };

//   return (
//     <div>
//       <button
//         onClick={() => setShowForm(true)}
//         className="bg-green-500 text-white px-4 py-2 rounded mb-4"
//       >
//         Add Expense
//       </button>

//       {showForm && <CreateForm expenseToEdit={expenseToEdit} closeForm={closeForm} />}

//       {/* Check if expenses is an array before calling map */}
//       <table className="min-w-full table-auto border-collapse border border-gray-200 mt-6">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="px-4 py-2 border border-gray-300">Serial</th>
//             <th className="px-4 py-2 border border-gray-300">Cost Title</th>
//             <th className="px-4 py-2 border border-gray-300">Amount</th>
//             <th className="px-4 py-2 border border-gray-300">Currency</th>
//             <th className="px-4 py-2 border border-gray-300">Note</th>
//             <th className="px-4 py-2 border border-gray-300">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Array.isArray(expenses) && expenses.length > 0 ? (
//             expenses.map((expense, index) => (
//               <tr key={expense.id}>
//                 <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
//                 <td className="px-4 py-2 border border-gray-300">{expense.costTitle}</td>
//                 <td className="px-4 py-2 border border-gray-300">{expense.amount}</td>
//                 <td className="px-4 py-2 border border-gray-300">{expense.currency}</td>
//                 <td className="px-4 py-2 border border-gray-300">{expense.note}</td>
//                 <td className="px-4 py-2 border border-gray-300">
//                   <button
//                     onClick={() => handleEdit(expense)}
//                     className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(expense.id)}
//                     className="bg-red-500 text-white px-4 py-2 rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" className="text-center py-4">No data available</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ExpenseTable;

