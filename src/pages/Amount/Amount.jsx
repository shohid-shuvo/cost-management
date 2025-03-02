import { useState, useEffect } from "react";
import axios from "axios";

const Amounts = () => {
  const [amounts, setAmounts] = useState([]);
  const [form, setForm] = useState({
    type_id: "",
    payment_method_id: "",
    amount: "",
    currency_id: "",
    note: "",
    status: "active",
    created_by: "Admin",
    updated_by: "Admin",
  });
  const [editingId, setEditingId] = useState(null);
  const [types, setTypes] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [amountsResponse, typesResponse, paymentMethodsResponse, currenciesResponse] =
        await Promise.all([
          axios.get("http://localhost/dailyexpense_api/api/get_expense_list.php"),
          axios.get("http://localhost/dailyexpense_api/api/types_of_cost/get_types.php"),
          axios.get("http://localhost/dailyexpense_api/api/payment_methods/get_payment_methods.php"),
          axios.get("http://localhost/dailyexpense_api/api/currency/get_currencies.php"),
        ]);

      setAmounts(amountsResponse.data);
      setTypes(typesResponse.data);
      setPaymentMethods(paymentMethodsResponse.data);
      setCurrencies(currenciesResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload = { ...form, id: editingId };
    try {
      if (editingId) {
        await axios.post("http://localhost/dailyexpense_api/api/update_expense.php", payload);
      } else {
        await axios.post("http://localhost/dailyexpense_api/api/add_expense.php", payload);
      }
      fetchData();
      setEditingId(null);
      setForm({
        type_id: "",
        payment_method_id: "",
        amount: "",
        currency_id: "",
        note: "",
        status: "active",
        created_by: "Admin",
        updated_by: "Admin",
      });
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.post("http://localhost/dailyexpense_api/api/delete_expense.php", { id });
      fetchData();
    } catch (error) {
      console.error("Error deleting amount:", error);
    }
  };

  const handleEdit = (amount) => {
    setForm({
      type_id: amount.type_id,
      payment_method_id: amount.payment_method_id,
      amount: amount.amount,
      currency_id: amount.currency_id,
      note: amount.note,
      status: amount.status,
      created_by: amount.created_by,
      updated_by: amount.updated_by,
    });
    setEditingId(amount.id);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Amounts (Expenses)</h2>
      <div className="mb-4 uni-indput">
        <select name="type_id" value={form.type_id} onChange={handleChange} className="p-2 border rounded mr-2">
          <option value="">Select Type</option>
          {types.map((type) => (
            <option key={type.id} value={type.id}>{type.title}</option>
          ))}
        </select>
        
        <select name="payment_method_id" value={form.payment_method_id} onChange={handleChange} className="p-2 border rounded mr-2">
          <option value="">Select Payment Method</option>
          {paymentMethods.map((method) => (
            <option key={method.id} value={method.id}>{method.title}</option>
          ))}
        </select>
        
        <select name="currency_id" value={form.currency_id} onChange={handleChange} className="p-2 border rounded mr-2">
          <option value="">Select Currency</option>
          {currencies.map((currency) => (
            <option key={currency.id} value={currency.id}>{currency.short_name}</option>
          ))}
        </select>
        
        <input type="text" name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" className="p-2 border rounded mr-2" />
        <input type="text" name="note" value={form.note} onChange={handleChange} placeholder="Note" className="p-2 border rounded mr-2" />
        
        <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">
          {editingId ? "Update" : "Add"}
        </button>
      </div>
      
      <table className="uni_table w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Type</th>
            <th className="border p-2">Payment Method</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Currency</th>
            <th className="border p-2">Note</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {amounts.map((amount) => (
            <tr key={amount.id}>
              <td className="border p-2">{types.find(t => t.id === amount.type_id)?.title || "N/A"}</td>
              <td className="border p-2">{paymentMethods.find(p => p.id === amount.payment_method_id)?.title || "N/A"}</td>
              <td className="border p-2">{amount.amount}</td>
              <td className="border p-2">{currencies.find(c => c.id === amount.currency_id)?.short_name || "N/A"}</td>
              <td className="border p-2">{amount.note}</td>
              <td className="border p-2">
                <button onClick={() => handleEdit(amount)} className="bg-yellow-500 text-white p-1 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(amount.id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Amounts;
