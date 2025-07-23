// src/components/UserNavbar.js
import React from "react";
import { Link } from "react-router-dom";

const UserNavbar = () => {
  return (
    <nav style={{ marginBottom: "20px" }}>
      <Link to="/home">Home</Link> |{" "}
      <Link to="/user/services">Services</Link> |{" "}
      <Link to="/user/posts">Posts</Link> |{" "}
      <Link to="/user/contact">Contact</Link> |{" "}
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </nav>
  );
};

export default UserNavbar;
