import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";
import "./Services.css";

const Services = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  const API = "http://localhost:3005/api/v1/services";
  const token = localStorage.getItem("token");

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`${API}/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
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

  const handleEdit = (service) => {
    setFormData({ title: service.title, description: service.description });
    setEditingId(service.id);
  };

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
    <div className="admin-layout">
      <AdminNavbar />
      <main className="dashboard-main">
        <div className="services-container">
          <h2 className="services-title">Manage Services</h2>
          
          <div className="services-form-card">
            <h3 className="form-subtitle">{editingId ? "Edit" : "Add New"} Service</h3>
            <form onSubmit={handleSubmit} className="services-form">
              <div className="form-group">
                <label htmlFor="title" className="form-label">Service Title</label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  className="form-input"
                  placeholder="Enter service title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description" className="form-label">Service Description</label>
                <input
                  id="description"
                  type="text"
                  name="description"
                  className="form-input"
                  placeholder="Enter service description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-actions">
                {editingId && (
                  <button 
                    type="button" 
                    className="btn-cancel" 
                    onClick={() => {
                      setFormData({ title: "", description: "" });
                      setEditingId(null);
                    }}
                  >
                    Cancel
                  </button>
                )}
                <button type="submit" className="btn-submit">
                  {editingId ? "Update" : "Add"} Service
                </button>
              </div>
            </form>
          </div>
          
          <div className="services-list-container">
            <h3 className="services-subtitle">Current Services</h3>
            {services.length === 0 ? (
              <div className="empty-state">No services found. Add your first service above.</div>
            ) : (
              <ul className="services-list">
                {services.map((service) => (
                  <li key={service.id} className="service-item">
                    <div className="service-content">
                      <h4 className="service-title">{service.title}</h4>
                      <p className="service-description">{service.description}</p>
                    </div>
                    <div className="service-actions">
                      <button 
                        className="action-btn edit-btn"
                        onClick={() => handleEdit(service)}
                      >
                        Edit
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(service.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;