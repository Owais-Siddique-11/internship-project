import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-left">
          <h3 className="footer-logo">YourCompany</h3>
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>

        <div className="footer-right">
          <ul className="footer-nav">
            <li><a href="/">🏠 Home</a></li>
            <li><a href="/about">ℹ️ About</a></li>
            <li><a href="/contact">📞 Contact</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;