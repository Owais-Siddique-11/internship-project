import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminNavbar.css'; // Create this for styling

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <nav className="admin-navbar">
      <h2 className="logo">Admin Panel</h2>
      <ul className="nav-links">
        <li><Link to="/dashboard">Pages</Link></li>
        <li><Link to="/admin/services">Services</Link></li>
        <li><Link to="/admin/posts">Posts</Link></li>
        <li><Link to="/admin/contacts">Contacts</Link></li>
        <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
