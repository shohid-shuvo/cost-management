import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [combinedData, setCombinedData] = useState([]);
  const [form, setForm] = useState({
    id: null, // Add ID for editing
    subject: "",
    amount: "",
    currency: "",
    paymentMethod: "",
  });
  const [types, setTypes] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [amounts, setAmounts] = useState([]);

  // Fetch data from all APIs
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (types.length > 0 && amounts.length > 0) {
      updateCombinedData();
    }
  }, [types, currencies, paymentMethods, amounts]);

  const fetchData = async () => {
    try {
      const [typesResponse, amountsResponse, currenciesResponse, paymentMethodsResponse] =
        await Promise.all([
          axios.get("http://localhost/dailyexpense_api/api/types_of_cost/get_types.php"),
          axios.get("http://localhost/dailyexpense_api/api/get_expense_list.php"),
          axios.get("http://localhost/dailyexpense_api/api/currency/get_currencies.php"),
          axios.get("http://localhost/dailyexpense_api/api/payment_methods/get_payment_methods.php"),
        ]);

      setTypes(typesResponse.data);
      setAmounts(amountsResponse.data);
      setCurrencies(currenciesResponse.data);
      setPaymentMethods(paymentMethodsResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateCombinedData = () => {
    const combined = amounts.map((amount) => {
      const type = types.find((t) => Number(t.id) === Number(amount.type_id));
      const currency = currencies.find((c) => Number(c.id) === Number(amount.currency_id));
      const paymentMethod = paymentMethods.find((p) => Number(p.id) === Number(amount.payment_method_id));

      return {
        id: amount.id, // Include ID for editing and deleting
        subject: type ? type.title : "N/A",
        amount: amount.amount,
        currency: currency ? currency.short_name : "N/A",
        paymentMethod: paymentMethod ? paymentMethod.title : "N/A",
      };
    });

    setCombinedData(combined);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const type = types.find((t) => t.title === form.subject);
    const currency = currencies.find((c) => c.short_name === form.currency);
    const paymentMethod = paymentMethods.find((p) => p.title === form.paymentMethod);

    if (!type || !currency || !paymentMethod) {
      console.error("Invalid selection. Please check your inputs.");
      return;
    }

    const payload = {
      id: form.id, // Include ID for update
      type_id: type.id,
      amount: form.amount,
      currency_id: currency.id,
      payment_method_id: paymentMethod.id,
      status: "active",
      created_by: "Admin",
      updated_by: "Admin",
    };

    try {
      if (form.id) {
        // Update existing expense
        await axios.post(
          "http://localhost/dailyexpense_api/api/update_expense.php",
          payload,
          { headers: { "Content-Type": "application/json" } }
        );
      } else {
        // Add new expense
        await axios.post(
          "http://localhost/dailyexpense_api/api/add_expense.php",
          payload,
          { headers: { "Content-Type": "application/json" } }
        );
      }

      setForm({
        id: null,
        subject: "",
        amount: "",
        currency: "",
        paymentMethod: "",
      });

      fetchData(); // Refresh data
    } catch (error) {
      console.error("Error submitting data:", error.response ? error.response.data : error.message);
    }
  };

  const handleEdit = (row) => {
    setForm({
      id: row.id,
      subject: row.subject,
      amount: row.amount,
      currency: row.currency,
      paymentMethod: row.paymentMethod,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.post("http://localhost/dailyexpense_api/api/delete_expense.php", { id });
      fetchData(); // Refresh data
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage your Expense</h2>

      <form onSubmit={handleSubmit} className="uni-indput mb-4">
        <div className="grid grid-cols-5 gap-[10px]">
          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Subject</option>
              {types.map((type) => (
                <option key={type.id} value={type.title}>
                  {type.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Currency</label>
            <select
              name="currency"
              value={form.currency}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Currency</option>
              {currencies.map((currency) => (
                <option key={currency.id} value={currency.short_name}>
                  {currency.short_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Payment Method</label>
            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Payment Method</option>
              {paymentMethods.map((method) => (
                <option key={method.id} value={method.title}>
                  {method.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              {form.id ? "Update" : "Add"} Expense
            </button>
          </div>
        </div>
      </form>

      <table className="uni_table w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Subject</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Currency</th>
            <th className="border p-2">Payment Method</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {combinedData.map((row) => (
            <tr key={row.id}>
              <td className="border p-2">{row.subject}</td>
              <td className="border p-2">{row.amount}</td>
              <td className="border p-2">{row.currency}</td>
              <td className="border p-2">{row.paymentMethod}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(row)}
                  className="bg-yellow-500 text-white p-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(row.id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;