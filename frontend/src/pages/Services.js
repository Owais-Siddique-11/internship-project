import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

const Services = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  const API = "http://localhost:3005/api/v1/services"; // Change if your route differs
  const token = localStorage.getItem("token");

  // ✅ Fetch services
  const fetchServices = async () => {
    try {
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(res.data.data);
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ✅ Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Add or update service
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // 🔄 Update
        await axios.put(`${API}/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // ➕ Create
        await axios.post(API, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setFormData({ title: "", description: "" });
      setEditingId(null);
      fetchServices();
    } catch (err) {
      console.error("Error submitting:", err);
    }
  };

  // ✅ Edit
  const handleEdit = (service) => {
    setFormData({ title: service.title, description: service.description });
    setEditingId(service.id);
  };

  // ❌ Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchServices();
    } catch (err) {
      console.error("Error deleting service:", err);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <h2>Manage Services</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Service Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Service Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId ? "Update" : "Add"} Service</button>
      </form>

      <ul>
        {services.map((service) => (
          <li key={service.id}>
            <strong>{service.title}</strong>: {service.description}{" "}
            <button onClick={() => handleEdit(service)}>Edit</button>
            <button onClick={() => handleDelete(service.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;
