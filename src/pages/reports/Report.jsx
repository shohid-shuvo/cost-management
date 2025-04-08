import { useState, useEffect } from "react";
import axios from "axios";

const Report = () => {
  const [amounts, setAmounts] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    type_id: "",
    payment_method_id: "",
    currency_id: "",
    date: "",
  });
  const [types, setTypes] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      setPaymentMethods(paymentMethodsResponse.data);
      setCurrencies(currenciesResponse.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchFilters({ ...searchFilters, [e.target.name]: e.target.value });
  };

  const filterAmounts = () => {
    return amounts.filter(amount => {
      const matchesType = searchFilters.type_id ? String(amount.type_id) === String(searchFilters.type_id) : true;
      const matchesPaymentMethod = searchFilters.payment_method_id ? String(amount.payment_method_id) === String(searchFilters.payment_method_id) : true;
      const matchesCurrency = searchFilters.currency_id ? String(amount.currency_id) === String(searchFilters.currency_id) : true;
      const matchesDate = searchFilters.date ? amount.created_at.startsWith(searchFilters.date) : true;

      return matchesType && matchesPaymentMethod && matchesCurrency && matchesDate;
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Report Search</h2>
      
      {/* Search Filters */}
      <div className="mb-4 uni-indput">
        <select 
          name="type_id" 
          value={searchFilters.type_id} 
          onChange={handleSearchChange} 
          className="p-2 border rounded mr-2"
        >
          <option value="">Select Type</option>
          {types.map((type) => (
            <option key={type.id} value={type.id}>{type.title}</option>
          ))}
        </select>

        <select 
          name="payment_method_id" 
          value={searchFilters.payment_method_id} 
          onChange={handleSearchChange} 
          className="p-2 border rounded mr-2"
        >
          <option value="">All Method</option>
          {paymentMethods.map((method) => (
            <option key={method.id} value={method.id}>{method.title}</option>
          ))}
        </select>

        <select 
          name="currency_id" 
          value={searchFilters.currency_id} 
          onChange={handleSearchChange} 
          className="p-2 border rounded mr-2"
        >
          <option value="">Select Currency</option>
          {currencies.map((currency) => (
            <option key={currency.id} value={currency.id}>{currency.short_name}</option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          value={searchFilters.date}
          onChange={handleSearchChange}
          className="p-2 border rounded mr-2"
        />
      </div>

      {/* Results Table */}
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
          {filterAmounts().length > 0 ? (
            filterAmounts().map((amount) => {
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
            })
          ) : (
            <tr>
              <td colSpan="6" className="border p-2 text-center">No expenses found matching your criteria</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Report;