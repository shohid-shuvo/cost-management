// src/pages/PaymentMethods/PaymentMethods.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
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
      .get("http://localhost/dailyexpense_api/api/payment_methods/get_payment_methods.php")
      .then((response) => setPaymentMethods(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  // Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or Update payment method
  const handleSubmit = () => {
    const payload = {
      ...form,
      id: editingId, // Include ID for update
    };

    console.log("Payload being sent:", payload); // Debugging log

    if (editingId) {
      // Update existing payment method
      axios
        .post(
          "http://localhost/dailyexpense_api/api/payment_methods/update_payment_method.php",
          payload,
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          console.log("Update Response:", response.data);
          fetchData();
          setEditingId(null);
          setForm({
            title: "",
            description: "",
            status: "active",
            created_by: "Admin",
            updated_by: "Admin",
          });
        })
        .catch((error) =>
          console.error("Error updating payment method:", error.response ? error.response.data : error.message)
        );
    } else {
      // Create new payment method
      axios
        .post(
          "http://localhost/dailyexpense_api/api/payment_methods/create_payment_method.php",
          payload,
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          console.log("Create Response:", response.data);
          fetchData();
          setForm({
            title: "",
            description: "",
            status: "active",
            created_by: "Admin",
            updated_by: "Admin",
          });
        })
        .catch((error) =>
          console.error("Error creating payment method:", error.response ? error.response.data : error.message)
        );
    }
  };

  // Delete payment method
  const handleDelete = (id) => {
    axios
      .post("http://localhost/dailyexpense_api/api/payment_methods/delete_payment_method.php", { id })
      .then(() => fetchData())
      .catch((error) => console.error("Error deleting payment method:", error));
  };

  // Edit payment method (populate form)
  const handleEdit = (paymentMethod) => {
    setForm({
      title: paymentMethod.title,
      description: paymentMethod.description,
      status: paymentMethod.status,
      created_by: paymentMethod.created_by,
      updated_by: paymentMethod.updated_by,
    });
    setEditingId(paymentMethod.id);
  };

  // Filter payment methods to show only active ones
  const activePaymentMethods = paymentMethods.filter((method) => method.status === "active");

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Payment Methods</h2>

      <div className="mb-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="p-2 border rounded mr-2"
        />
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
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

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">id</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {activePaymentMethods.map((paymentMethod) => (
            <tr key={paymentMethod.id}>
              <td className="border p-2">{paymentMethod.id}</td>
              <td className="border p-2">{paymentMethod.title}</td>
              <td className="border p-2">{paymentMethod.description}</td>
              <td className="border p-2">{paymentMethod.status}</td>
              <td className="border p-2">
                <button onClick={() => handleEdit(paymentMethod)} className="bg-yellow-500 text-white p-1 rounded mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(paymentMethod.id)} className="bg-red-500 text-white p-1 rounded">
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

export default PaymentMethods;