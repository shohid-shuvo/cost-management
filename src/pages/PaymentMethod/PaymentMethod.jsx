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
  const [alertMessage, setAlertMessage] = useState(""); // State for success/error alert
  const [isError, setIsError] = useState(false); // State to track if the alert is an error

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

  // Validate form fields
  const validateForm = () => {
    if (!form.title.trim() || !form.description.trim()) {
      setAlertMessage("Title and Description are required!"); // Error message
      setIsError(true); // Set alert as error
      setTimeout(() => {
        setAlertMessage("");
        setIsError(false);
      }, 2000); // Hide alert after 2 seconds
      return false; // Validation failed
    }
    return true; // Validation passed
  };

  // Create or Update payment method
  const handleSubmit = () => {
    if (!validateForm()) return; // Stop if validation fails

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
          setAlertMessage("Payment method updated successfully!"); // Success alert for update
          setIsError(false); // Set alert as success
        })
        .catch((error) => {
          console.error("Error updating payment method:", error.response ? error.response.data : error.message);
          setAlertMessage("Failed to update payment method!"); // Error alert
          setIsError(true); // Set alert as error
        });
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
          setAlertMessage("Payment method added successfully!"); // Success alert for add
          setIsError(false); // Set alert as success
        })
        .catch((error) => {
          console.error("Error creating payment method:", error.response ? error.response.data : error.message);
          setAlertMessage("Failed to add payment method!"); // Error alert
          setIsError(true); // Set alert as error
        });
    }

    // Hide the alert after 2 seconds
    setTimeout(() => {
      setAlertMessage("");
      setIsError(false);
    }, 2000);
  };

  // Delete payment method
  const handleDelete = (id) => {
    axios
      .post("http://localhost/dailyexpense_api/api/payment_methods/delete_payment_method.php", { id })
      .then(() => {
        fetchData();
        setAlertMessage("Payment method deleted successfully!"); // Success alert for delete
        setIsError(false); // Set alert as success
      })
      .catch((error) => {
        console.error("Error deleting payment method:", error);
        setAlertMessage("Failed to delete payment method!"); // Error alert
        setIsError(true); // Set alert as error
      });

    // Hide the alert after 2 seconds
    setTimeout(() => {
      setAlertMessage("");
      setIsError(false);
    }, 2000);
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
      {/* Alert */}
      {alertMessage && (
        <div className={`p-4 mb-4 rounded ${isError ? "uni_danger_alert" : "uni_success_alert"} text-white`}>
          {alertMessage}
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">Payment Methods</h2>

      <div className="mb-4 uni-indput">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="p-2 border rounded mr-2"
          required
        />
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="p-2 border rounded mr-2"
          required
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
            <th className="border p-2">ID</th>
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