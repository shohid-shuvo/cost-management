import { useState, useEffect } from "react";
import axios from "axios";

const TypesOfCost = () => {
  const [types, setTypes] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", status: "active", updated_by: "admin" });
  const [editingId, setEditingId] = useState(null);
  const [alertMessage, setAlertMessage] = useState(""); // State for success/error alert
  const [isError, setIsError] = useState(false); // State to track if the alert is an error

  // Fetch data from API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost/dailyexpense_api/api/types_of_cost/get_types.php")
      .then((response) => setTypes(response.data))
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

  // Create or Update type
  const handleSubmit = () => {
    if (!validateForm()) return; // Stop if validation fails

    const payload = {
      id: editingId, // Include ID for update
      title: form.title,
      description: form.description,
      status: form.status,
      updated_by: "admin",
    };

    if (editingId) {
      axios
        .post(
          `http://localhost/dailyexpense_api/api/types_of_cost/update_type.php`,
          payload,
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          console.log("Update Response:", response.data);
          fetchData();
          setEditingId(null);
          setForm({ title: "", description: "", status: "active", updated_by: "admin" });
          setAlertMessage("Type updated successfully!"); // Success alert for update
          setIsError(false); // Set alert as success
        })
        .catch((error) => {
          console.error("Error updating type:", error.response ? error.response.data : error.message);
          setAlertMessage("Failed to update type!"); // Error alert
          setIsError(true); // Set alert as error
        });
    } else {
      axios
        .post(
          "http://localhost/dailyexpense_api/api/types_of_cost/create_type.php",
          payload,
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          console.log("Create Response:", response.data);
          fetchData();
          setForm({ title: "", description: "", status: "active", updated_by: "admin" });
          setAlertMessage("Type added successfully!"); // Success alert for add
          setIsError(false); // Set alert as success
        })
        .catch((error) => {
          console.error("Error creating type:", error.response ? error.response.data : error.message);
          setAlertMessage("Failed to add type!"); // Error alert
          setIsError(true); // Set alert as error
        });
    }

    // Hide the alert after 2 seconds
    setTimeout(() => {
      setAlertMessage("");
      setIsError(false);
    }, 2000);
  };

  // Delete type
  const handleDelete = (id) => {
    axios
      .post("http://localhost/dailyexpense_api/api/types_of_cost/delete_type.php", { id })
      .then(() => {
        fetchData();
        setAlertMessage("Type deleted successfully!"); // Success alert for delete
        setIsError(false); // Set alert as success
      })
      .catch((error) => {
        console.error("Error deleting type:", error);
        setAlertMessage("Failed to delete type!"); // Error alert
        setIsError(true); // Set alert as error
      });

    // Hide the alert after 2 seconds
    setTimeout(() => {
      setAlertMessage("");
      setIsError(false);
    }, 2000);
  };

  // Edit type (populate form)
  const handleEdit = (type) => {
    setForm({ title: type.title, description: type.description, status: type.status, updated_by: "admin" });
    setEditingId(type.id);
  };

  return (
    <div className="py-2 px-[20px]">
      {/* Alert */}
      {alertMessage && (
        <div className={`p-4 mb-4 rounded ${isError ? "uni_danger_alert" : "uni_success_alert"} text-white`}>
          {alertMessage}
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">Types of Cost</h2>

      <div className="uni-indput">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="p-2 border rounded mr-2 py-[5px]"
          required
        />
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="p-2 border rounded mr-2 py-[5px]"
          required
        />
        <button onClick={handleSubmit} className="px-[15px] py-[6px] ml-[10px] bg-[#60a5fa] text-white p-2 border-0">
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      <table className="uni_table w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {types.map((type) => (
            <tr key={type.id}>
              <td className="border p-2">{type.id}</td>
              <td className="border p-2">{type.title}</td>
              <td className="border p-2">{type.description}</td>
              <td className="border p-2">
                <button onClick={() => handleEdit(type)} className="bg-yellow-500 text-white p-1 rounded mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(type.id)} className="bg-red-500 text-white p-1 rounded">
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

export default TypesOfCost;