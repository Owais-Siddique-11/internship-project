import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-left">
          <h3 className="footer-logo">CMS Website</h3>
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>

        <div className="footer-right">
          <div className="footer-info">
            <p>Building Tomorrow Today</p>
            <p className="footer-tagline">Excellence • Innovation • Integrity</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;