import React from "react";
import { Link } from "react-router-dom";
import Pages from "../components/Pages";
import AdminNavbar from "../components/AdminNavbar"; // ✅ Import it

const Dashboard = () => {
  return (
    <>
      <AdminNavbar /> {/* ✅ Add Navbar */}
      <div style={{ padding: "20px" }}>
        <h2>Welcome to Admin Dashboard</h2>

        {/* Create New Page Button */}
        <Link to="/admin/pages/add">
          <button style={{ marginBottom: "15px" }}>Create New Page</button>
        </Link>

        <Pages />
      </div>
    </>
  );
};

export default Dashboard;
