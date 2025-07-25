// src/pages/UserServices.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import "./UserServices.css";

const UserServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3005/api/v1/services", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching services:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="user-layout">
      <UserNavbar />
      <main className="services-main">
        <div className="services-container">
          <div className="services-header">
            <h1 className="services-title">Our Services</h1>
            <p className="services-subtitle">
              Discover how we can help you achieve your goals
            </p>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="loader"></div>
              <p>Loading services...</p>
            </div>
          ) : services.length === 0 ? (
            <div className="empty-state">
              <p>No services available at the moment. Please check back later.</p>
            </div>
          ) : (
            <div className="services-grid">
              {services.map((service, index) => (
                <div key={service.id} className="service-card">
                  <div className="service-icon">
                    {/* Use emoji as placeholder icon - you can replace with proper icons */}
                    {getServiceIcon(index)}
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <div className="service-description">
                    <p>{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Helper function to get different icons for services (for visual variety)
const getServiceIcon = (index) => {
  const icons = ["💼", "📊", "🚀", "🔧", "📱", "💡", "🎯", "🛠️"];
  return icons[index % icons.length];
};

export default UserServices;