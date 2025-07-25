import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminNavbar.css';

const AdminNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };
  // In AdminNavbar.js
const handleToggleSidebar = () => {
  setSidebarOpen(!sidebarOpen);
  document.querySelector('.admin-layout').classList.toggle('sidebar-open');
}

  return (
    <>
      <div className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        ☰
      </div>

      <nav className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <h2 className="logo">Admin Panel</h2>
        <ul>
          <li><Link to="/dashboard">Pages</Link></li>
          <li><Link to="/admin/services">Services</Link></li>
          <li><Link to="/admin/posts">Posts</Link></li>
          <li><Link to="/admin/contacts">Contacts</Link></li>
          <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
        </ul>
      </nav>
    </>
  );
};

export default AdminNavbar;
