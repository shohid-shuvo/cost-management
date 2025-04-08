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
  const [types, setTypes] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");

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

      setAmounts(amountsResponse.data.reverse());
      setTypes(typesResponse.data);

      const methods = paymentMethodsResponse.data;
      setPaymentMethods(methods);
      const cashMethod = methods.find(m => m.title.toLowerCase() === "cash");

      const currencyList = currenciesResponse.data;
      setCurrencies(currencyList);
      const bdtCurrency = currencyList.find(c => c.short_name.toLowerCase() === "bdt");

      setForm(prev => ({
        ...prev,
        payment_method_id: cashMethod?.id || "",
        currency_id: bdtCurrency?.id || ""
      }));

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost/dailyexpense_api/api/add_expense.php", form);
      setAlertMessage("Expense added successfully!");
      fetchData();
      setForm({
        type_id: "",
        payment_method_id: form.payment_method_id,
        amount: "",
        currency_id: form.currency_id,
        note: "",
        status: "active",
        created_by: "Admin",
        updated_by: "Admin",
      });
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setTimeout(() => {
        setAlertMessage("");
      }, 2000);
    }
  };

  // Calculate total amount
  const totalAmount = amounts.reduce((sum, amount) => sum + parseFloat(amount.amount || 0), 0);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      {alertMessage && (
        <div className="uni_success_alert bg-green-500 text-white p-4 mb-4 rounded">
          {alertMessage}
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">Amounts (Expenses)</h2>
      <div className="mb-4 uni-indput">
        <select name="type_id" value={form.type_id} onChange={handleChange} className="p-2 border rounded mr-2">
          <option value="">Select Type</option>
          {types.map((type) => (
            <option key={type.id} value={type.id}>{type.title}</option>
          ))}
        </select>

        <select name="payment_method_id" value={form.payment_method_id} onChange={handleChange} className="p-2 border rounded mr-2">
          {paymentMethods.map((method) => (
            <option key={method.id} value={method.id}>{method.title}</option>
          ))}
        </select>

        <select name="currency_id" value={form.currency_id} onChange={handleChange} className="p-2 border rounded mr-2">
          {currencies.map((currency) => (
            <option key={currency.id} value={currency.id}>{currency.short_name}</option>
          ))}
        </select>

        <input type="text" name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" className="p-2 border rounded mr-2" />
        <input type="text" name="note" value={form.note} onChange={handleChange} placeholder="Note" className="p-2 border rounded mr-2" />

        <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">Add</button>
      </div>

      <table className="uni_table w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Type</th>
            <th className="border p-2">Payment Method</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Currency</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Note</th>
          </tr>
        </thead>
        <tbody>
          {amounts.map((amount) => {
            const type = types.find(t => String(t.id) === String(amount.type_id));
            const paymentMethod = paymentMethods.find(p => String(p.id) === String(amount.payment_method_id));
            const currency = currencies.find(c => String(c.id) === String(amount.currency_id));

            return (
              <tr key={amount.id}>
                <td className="border p-2">{type?.title || "N/A"}</td>
                <td className="border p-2">{paymentMethod?.title || "N/A"}</td>
                <td className="border p-2">{amount.amount}</td>
                <td className="border p-2">{currency?.short_name || "N/A"}</td>
                <td className="border p-2">{amount.created_at || "N/A"}</td>
                <td className="border p-2">{amount.note}</td>
              </tr>
            );
          })}

          {/* Total Cost Row */}
          <tr className="bg-gray-300">
            <td className="border p-2"></td>
            <td className="border p-2 text-right font-bold">Total Cost:</td>
            <td className="border p-2 font-bold">{totalAmount.toFixed(2)}</td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Amounts;
