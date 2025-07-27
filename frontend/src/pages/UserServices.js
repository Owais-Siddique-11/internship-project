// src/pages/UserServices.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import "./UserServices.css";

const UserServices = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const token = localStorage.getItem("token");

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3005/api/v1/services", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(res.data.data);
      setFilteredServices(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching services:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Filter services when search query changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredServices(services);
    } else {
      const lowercaseQuery = searchQuery.toLowerCase();
      const filtered = services.filter(
        service => 
          service.title.toLowerCase().includes(lowercaseQuery) ||
          service.description.toLowerCase().includes(lowercaseQuery)
      );
      setFilteredServices(filtered);
    }
  }, [searchQuery, services]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
  };

  // Check if an imageUrl is likely an emoji (single Unicode character)
  const isEmojiUrl = (url) => {
    return url && url.length <= 2;
  };

  // Fallback icon if no image or emoji
  const getFallbackIcon = (index) => {
    const icons = ["💼", "📊", "🚀", "🔧", "📱", "💡", "🎯", "🛠️"];
    return icons[index % icons.length];
  };

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

          <div className="search-container">
            <div className="search-input-wrapper">
              <input
                type="text"
                className="search-input"
                placeholder="Search services..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={clearSearch}>
                  ✕
                </button>
              )}
            </div>
            <div className="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="loader"></div>
              <p>Loading services...</p>
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="empty-state">
              {searchQuery ? (
                <div>
                  <p>No services found matching "{searchQuery}"</p>
                  <button className="reset-search-btn" onClick={clearSearch}>
                    Show all services
                  </button>
                </div>
              ) : (
                <p>No services available at the moment. Please check back later.</p>
              )}
            </div>
          ) : (
            <>
              {searchQuery && (
                <div className="search-results-info">
                  Found {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'} 
                  matching "{searchQuery}"
                </div>
              )}
              <div className="services-grid">
                {filteredServices.map((service, index) => (
                  <div key={service.id} className="service-card">
                    <div className="service-visual">
                      {service.imageUrl ? (
                        isEmojiUrl(service.imageUrl) ? (
                          // Display emoji
                          <div className="service-emoji-wrapper">
                            <span className="service-emoji">{service.imageUrl}</span>
                          </div>
                        ) : (
                          // Display image
                          <div className="service-image-wrapper">
                            <img 
                              src={service.imageUrl} 
                              alt={service.title}
                              className="service-image"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.style.display = 'none';
                                e.target.parentNode.innerHTML = `<span class="service-fallback-emoji">${getFallbackIcon(index)}</span>`;
                              }}
                            />
                          </div>
                        )
                      ) : (
                        // Display fallback icon
                        <div className="service-emoji-wrapper">
                          <span className="service-fallback-emoji">{getFallbackIcon(index)}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="service-title">{service.title}</h3>
                    <div className="service-description">
                      <p>{service.description}</p>
                    </div>
                    <div className="service-footer">
                      <button className="service-btn">Learn More</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserServices;