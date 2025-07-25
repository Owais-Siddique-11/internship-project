// src/pages/UserContact.js
import React, { useState } from "react";
import axios from "axios";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import "./UserContact.css";

const UserContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      await axios.post("http://localhost:3005/api/v1/contacts", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setError("There was a problem sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewMessage = () => {
    setSubmitted(false);
  };

  return (
    <div className="user-layout">
      <UserNavbar />
      <main className="contact-main">
        <div className="contact-container">
          <div className="contact-header">
            <h1 className="contact-title">Contact Us</h1>
            <p className="contact-subtitle">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </div>

          <div className="contact-content">
            <div className="contact-info">
              <div className="info-item">
                <div className="info-icon">📍</div>
                <div className="info-text">
                  <h3>Our Location</h3>
                  <p>123 Business Street, Suite 100<br />City, State 12345</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">📧</div>
                <div className="info-text">
                  <h3>Email Us</h3>
                  <p>contact@yourcompany.com<br />support@yourcompany.com</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">📞</div>
                <div className="info-text">
                  <h3>Call Us</h3>
                  <p>(123) 456-7890<br />Monday-Friday, 9am-5pm</p>
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              {submitted ? (
                <div className="success-message">
                  <div className="success-icon">✓</div>
                  <h2>Message Sent!</h2>
                  <p>Thank you for contacting us. We'll respond as soon as possible.</p>
                  <button 
                    className="new-message-btn" 
                    onClick={handleNewMessage}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      className="form-input"
                      placeholder="John Doe"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Your Email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      className="form-input"
                      placeholder="john@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-textarea"
                      placeholder="How can we help you?"
                      required
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                  
                  {error && <div className="error-message">{error}</div>}
                  
                  <div className="form-actions">
                    <button 
                      type="submit" 
                      className="submit-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserContact;