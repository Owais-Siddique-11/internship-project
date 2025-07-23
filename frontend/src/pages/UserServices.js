// src/pages/UserServices.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../components/UserNavbar";

const UserServices = () => {
  const [services, setServices] = useState([]);
  const token = localStorage.getItem("token");

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:3005/api/v1/services", {
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

  return (
    <div>
      <UserNavbar />
      <h2>Our Services</h2>
      {services.map((service) => (
        <div key={service.id} style={{ marginBottom: "20px" }}>
          <h4>{service.title}</h4>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  );
};

export default UserServices;
