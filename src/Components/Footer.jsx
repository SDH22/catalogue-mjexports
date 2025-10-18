import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">MJ Exports</h3>
            <p className="footer-description">
              Crafting timeless furniture pieces for modern living spaces. 
              Quality, sustainability, and exceptional design.
            </p>
          </div>

          <div className="footer-section">
            <h4>Navigation</h4>
            <div className="footer-links">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/products" className="footer-link">Products</Link>
              <Link to="/collections" className="footer-link">Collections</Link>
              <Link to="/inspiration" className="footer-link">Inspiration</Link>
              <Link to="/about" className="footer-link">About</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
            </div>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <div className="footer-contact">
              <p>Email: info@mjexports.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Design District, Furniture City</p>
            </div>
          </div>

          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Instagram">
                Instagram
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                Facebook
              </a>
              <a href="#" className="social-link" aria-label="Pinterest">
                Pinterest
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} MJ Exports. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#" className="legal-link">Privacy Policy</a>
              <a href="#" className="legal-link">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;