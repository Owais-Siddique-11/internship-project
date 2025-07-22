import React from "react";
import { Link } from "react-router-dom"; // ⬅️ Don't forget this import!
import Pages from "../components/Pages";

const Dashboard = () => {
  return (
    <div>
      <h2>Welcome to Admin Dashboard</h2>
      
      {/* ✅ Add New Page Button */}
      <Link to="/admin/pages/add">
        <button style={{ marginBottom: "15px" }}>Create New Page</button>
      </Link>

      <Pages />
    </div>
  );
};

export default Dashboard;
