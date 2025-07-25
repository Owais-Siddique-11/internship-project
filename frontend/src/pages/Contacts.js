import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";
import "./Contact.css";

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const API = "http://localhost:3005/api/v1/contacts";

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching contacts:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchContacts();
    } catch (err) {
      console.error("Error deleting contact:", err);
    }
  };

  return (
    <div className="admin-layout">
      <AdminNavbar />
      <main className="dashboard-main">
        <div className="contacts-container">
          <h2 className="contacts-title">Contact Submissions</h2>
          
          {loading ? (
            <div className="loading-state">
              <div className="loader"></div>
              <p>Loading contacts...</p>
            </div>
          ) : contacts.length === 0 ? (
            <div className="empty-contacts">
              <div className="empty-icon">📬</div>
              <h3>No Messages Yet</h3>
              <p>Contact submissions from your website will appear here</p>
            </div>
          ) : (
            <div className="contacts-list">
              {contacts.map((contact) => (
                <div key={contact.id} className="contact-card">
                  <div className="contact-header">
                    <h3 className="contact-name">{contact.name}</h3>
                    <span className="contact-date">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="contact-info">
                    <div className="info-row">
                      <span className="info-label">Email:</span>
                      <a href={`mailto:${contact.email}`} className="contact-email">
                        {contact.email}
                      </a>
                    </div>
                    
                    {contact.phone && (
                      <div className="info-row">
                        <span className="info-label">Phone:</span>
                        <span className="contact-phone">{contact.phone}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="contact-message">
                    <p>{contact.message}</p>
                  </div>
                  
                  <div className="contact-actions">
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(contact.id)}
                    >
                      Delete Message
                    </button>
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

export default Contact;