import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-light text-dark py-4 mt-5 border-top">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5 className="text-success">Agritrade</h5>
            <p>
              A E-Commerce Platform For Farmers Providing Live auctions And Agricultural MarketPlace . 
              Place bids in real time and get the best deals directly from sellers.
            </p>
          </div>

          <div className="col-md-4 mb-3">
            <h5 className="text-dark">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-dark text-decoration-none footer-link">Home</Link></li>
              <li><Link to="/auction" className="text-dark text-decoration-none footer-link">Live Auctions</Link></li>
              <li><Link to="/products" className="text-dark text-decoration-none footer-link">Shop On Agritrade</Link></li>
              <li><Link to="/seller/register" className="text-dark text-decoration-none footer-link">Sell on Agritrade</Link></li>
              <li><Link to="/contactus" className="text-dark text-decoration-none footer-link">Contact Us</Link></li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h5 className="text-dark">Contact Us</h5>
            <p>Email: <a href="mailto:support@agritrade.com" className="text-success text-decoration-none">support@agritrade.com</a></p>
            <p>Phone: <a href="tel:+919876543210" className="text-success text-decoration-none">+91 98765 43210</a></p>
            <h6 className="text-dark mt-4">Follow Us</h6>
            <div className="gap-3">
              <a href="https://facebook.com/agritrade" target="_blank" rel="noopener noreferrer" className="text-dark social-link m-2"><Facebook/></a>
              <a href="https://twitter.com/agritrade" target="_blank" rel="noopener noreferrer" className="text-dark social-link m-2"><Twitter/></a>
              <a href="https://instagram.com/agritrade" target="_blank" rel="noopener noreferrer" className="text-dark social-link m-2"><Instagram /></a>
              <a href="https://linkedin.com/company/agritrade" target="_blank" rel="noopener noreferrer" className="text-dark social-link m-2"><Linkedin/></a>
            </div>
          </div>
        </div>

        <hr className="my-3 border-secondary" />
        <p className="text-center mb-0">© {new Date().getFullYear()} <span className="text-success">Agritrade</span>. All Rights Reserved.</p>
      </div>

      <style>
        {`
          .footer-link:hover {
            color: #28a745 !important; 
            transition: color 0.3s ease-in-out;
          }
          .social-link {
            font-size: 1.5rem;
            transition: transform 0.3s ease-in-out;
          }
          .social-link:hover {
            transform: scale(1.2);
            color: #28a745 !important;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
