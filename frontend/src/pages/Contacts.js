import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const token = localStorage.getItem("token");
  const API = "http://localhost:3005/api/v1/contacts"; // adjust if different

  const fetchContacts = async () => {
    try {
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(res.data.data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
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
    <div>
      <AdminNavbar />
      <h2>Contact Submissions</h2>
      {contacts.length === 0 ? (
        <p>No contact entries found.</p>
      ) : (
        <ul>
          {contacts.map((c) => (
            <li key={c.id}>
              <p><strong>Name:</strong> {c.name}</p>
              <p><strong>Email:</strong> {c.email}</p>
              <p><strong>Message:</strong> {c.message}</p>
              <button onClick={() => handleDelete(c.id)}>Delete</button>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Contact;
