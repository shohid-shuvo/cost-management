// src/pages/FrontPage/FrontPage.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [combinedData, setCombinedData] = useState([]);
  const [form, setForm] = useState({
    subject: "",
    amount: "",
    currency: "",
    paymentMethod: "",
  });
  const [types, setTypes] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [amounts, setAmounts] = useState([]); // modfy: Store amounts separately

  // Fetch data from all APIs
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (types.length > 0 && amounts.length > 0) {
      updateCombinedData(); // modfy: Update combinedData when types are loaded
    }
  }, [types, currencies, paymentMethods]); // modfy: Update when dependencies change

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
      setAmounts(amountsResponse.data); // modfy: Save amounts separately
      setCurrencies(currenciesResponse.data);
      setPaymentMethods(paymentMethodsResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateCombinedData = () => { // modfy: Separate function for data combination
    const combined = amounts.map((amount) => {
      const type = types.find((t) => Number(t.id) === Number(amount.type_id)); // modfy: Ensure matching ID type
      const currency = currencies.find((c) => Number(c.id) === Number(amount.currency_id));
      const paymentMethod = paymentMethods.find((p) => Number(p.id) === Number(amount.payment_method_id));

      return {
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
      type_id: type.id,
      amount: form.amount,
      currency_id: currency.id,
      payment_method_id: paymentMethod.id,
      status: "active",
      created_by: "Admin",
      updated_by: "Admin",
    };

    try {
      const response = await axios.post(
        "http://localhost/dailyexpense_api/api/add_expense.php",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Data submitted successfully:", response.data);

      setForm({
        subject: "",
        amount: "",
        currency: "",
        paymentMethod: "",
      });

      fetchData();
    } catch (error) {
      console.error("Error submitting data:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Combined Data</h2>

      <form onSubmit={handleSubmit} className="uni-indput mb-4">
        <div className=" grid grid-cols-5 gap-[10px] ">
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
              Add Expense
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
          </tr>
        </thead>
        <tbody>
          {combinedData.map((row, index) => (
            <tr key={index}>
              <td className="border p-2">{row.subject}</td>
              <td className="border p-2">{row.amount}</td>
              <td className="border p-2">{row.currency}</td>
              <td className="border p-2">{row.paymentMethod}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
