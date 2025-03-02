// src/pages/Currency/Currency.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const Currency = () => {
  const [currencies, setCurrencies] = useState([]);
  const [form, setForm] = useState({
    symbol: "",
    short_name: "",
    name: "",
    status: "active",
    created_by: "Admin",
    updated_by: "Admin",
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch data from API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost/dailyexpense_api/api/currency/get_currencies.php")
      .then((response) => setCurrencies(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  // Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or Update currency
  const handleSubmit = () => {
    const payload = {
      ...form,
      id: editingId, // Include ID for update
    };

    console.log("Payload being sent:", payload); // Debugging log

    if (editingId) {
      // Update existing currency
      axios
        .post(
          "http://localhost/dailyexpense_api/api/currency/update_currency.php",
          payload,
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          console.log("Update Response:", response.data);
          fetchData();
          setEditingId(null);
          setForm({
            symbol: "",
            short_name: "",
            name: "",
            status: "active",
            created_by: "Admin",
            updated_by: "Admin",
          });
        })
        .catch((error) =>
          console.error("Error updating currency:", error.response ? error.response.data : error.message)
        );
    } else {
      // Create new currency
      axios
        .post(
          "http://localhost/dailyexpense_api/api/currency/create_currency.php",
          payload,
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          console.log("Create Response:", response.data);
          fetchData();
          setForm({
            symbol: "",
            short_name: "",
            name: "",
            status: "active",
            created_by: "Admin",
            updated_by: "Admin",
          });
        })
        .catch((error) =>
          console.error("Error creating currency:", error.response ? error.response.data : error.message)
        );
    }
  };

  // Delete currency
  const handleDelete = (id) => {
    axios
      .post("http://localhost/dailyexpense_api/api/currency/delete_currency.php", { id })
      .then(() => fetchData())
      .catch((error) => console.error("Error deleting currency:", error));
  };

  // Edit currency (populate form)
  const handleEdit = (currency) => {
    setForm({
      symbol: currency.symbol,
      short_name: currency.short_name,
      name: currency.name,
      status: currency.status,
      created_by: currency.created_by,
      updated_by: currency.updated_by,
    });
    setEditingId(currency.id);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Currencies</h2>

      <div className="mb-4 uni-indput">
        <input
          type="text"
          name="symbol"
          value={form.symbol}
          onChange={handleChange}
          placeholder="Symbol"
          className="p-2 border rounded mr-2"
        />
        <input
          type="text"
          name="short_name"
          value={form.short_name}
          onChange={handleChange}
          placeholder="Short Name"
          className="p-2 border rounded mr-2"
        />
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="p-2 border rounded mr-2"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="p-2 border rounded mr-2"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      <table className="uni_table w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Symbol</th>
            <th className="border p-2">Short Name</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map((currency) => (
            <tr key={currency.id}>
              <td className="border p-2">{currency.symbol}</td>
              <td className="border p-2">{currency.short_name}</td>
              <td className="border p-2">{currency.name}</td>
              <td className="border p-2">{currency.status}</td>
              <td className="border p-2">
                <button onClick={() => handleEdit(currency)} className="bg-yellow-500 text-white p-1 rounded mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(currency.id)} className="bg-red-500 text-white p-1 rounded">
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

export default Currency;