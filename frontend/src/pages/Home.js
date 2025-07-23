// src/pages/Home.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../components/UserNavbar";

const Home = () => {
  const [pages, setPages] = useState([]);
  const token = localStorage.getItem("token");

  const fetchPages = async () => {
    try {
      const res = await axios.get("http://localhost:3005/api/v1/pages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPages(res.data.data);
    } catch (err) {
      console.error("Error fetching pages:", err);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  return (
    <div>
      <UserNavbar />
      <h2>Welcome, User</h2>
      <h3>Published Pages</h3>
      {pages.map((page) => (
        <div key={page.id} style={{ marginBottom: "20px" }}>
          <h4>{page.title}</h4>
          <p>{page.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
