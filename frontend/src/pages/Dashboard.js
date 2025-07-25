import React from "react";
import { Link } from "react-router-dom";
import Pages from "../components/Pages";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="admin-layout">
      <AdminNavbar />
      <main className="dashboard-main">
        <div className="dashboard-content">
          <h2>Welcome to Admin Dashboard</h2>
          <Link to="/admin/pages/add">
            <button className="create-btn">Create New Page</button>
          </Link>
          <Pages />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;