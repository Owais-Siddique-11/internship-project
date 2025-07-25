// src/components/UserNavbar.js
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./UserNavbar.css";

const UserNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <header className="user-header">
      <div className="user-navbar">
        <div className="user-navbar-container">
          <div className="user-navbar-logo">
            <Link to="/home">CMS WEBSITE</Link>
          </div>

          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <span className="menu-icon">☰</span>
          </button>

          <nav className={`user-nav ${mobileMenuOpen ? 'open' : ''}`}>
            <ul className="user-nav-links">
              <li>
                <Link to="/home" className={isActive("/home")}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/user/services" className={isActive("/user/services")}>
                  Services
                </Link>
              </li>
              <li>
                <Link to="/user/posts" className={isActive("/user/posts")}>
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/user/contact" className={isActive("/user/contact")}>
                  Contact
                </Link>
              </li>
            </ul>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default UserNavbar;