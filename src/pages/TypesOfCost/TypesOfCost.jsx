// src/pages/TypesOfCost/TypesOfCost.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const TypesOfCost = () => {
  const [types, setTypes] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", status: "active", updated_by: "admin" });
  const [editingId, setEditingId] = useState(null);

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

  // Create or Update type
  const handleSubmit = () => {
    const payload = {
      id: editingId, // modfy: add ID in Json 
      title: form.title,
      description: form.description,
      status: form.status,
      updated_by: "admin",
    };
  
    // console.log("Payload being sent:", payload); // Debugging log
  
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
        })
        .catch((error) => console.error("Error updating type:", error.response ? error.response.data : error.message));
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
        })
        .catch((error) => console.error("Error creating type:", error.response ? error.response.data : error.message));
    }
  };
  

  // Delete type
  const handleDelete = (id) => {
    axios
      .post("http://localhost/dailyexpense_api/api/types_of_cost/delete_type.php", { id })
      .then(() => fetchData())
      .catch((error) => console.error("Error deleting type:", error));
  };

  // Edit type (populate form)
  const handleEdit = (type) => {
    setForm({ title: type.title, description: type.description, status: type.status, updated_by: "admin" });
    setEditingId(type.id);
  };

  return (
    <div className="py-2 px-[20px] ">
      <h2 className="text-2xl font-bold mb-4">Types of Cost</h2>

      <div className="my-[20px] uni-indput">
        <input
          type="id"
          name="id"
          value={form.id}
          onChange={handleChange}
          placeholder="id"
          className="p-2 border rounded mr-2 py-[5px]"
        />
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="p-2 border rounded mr-2 py-[5px]"
        />
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="p-2 border rounded mr-2 py-[5px]"
        />
        <button onClick={handleSubmit} className="px-[15px] py-[6px] ml-[10px] bg-[#60a5fa] text-white p-2 border-0">
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      <table className="uni_table w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th> {/* Added ID column */}
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {types.map((type) => (
            <tr key={type.id}>
              <td className="border p-2">{type.id}</td> {/* Display ID */}
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
