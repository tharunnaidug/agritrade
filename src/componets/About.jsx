import React from 'react';
import '../About.css';

const About = () => {
  return (
    <>
      <div className="about-container">
        <h3 className="title">Welcome To AgriTrade</h3>
        <div className="logo-section">
          <img src="./logot.png" alt="logo" className="aboutlogo" />
          <p className="subtitle">E-com Platform For Farmers</p>
        </div>
        <div className="section">
          <h4>Who We Are?</h4>
          <p>AgriTrade is an innovative e-commerce platform designed to bridge the gap between farmers, wholesalers, retailers and consumers. Our mission is to empower farmers by providing them with a direct, transparent and profitable marketplace to sell their crops and buy essential farming supplies</p>
        </div>
        <div className="section">
          <h4>Our Vision</h4>
          <p>To digitally transform the agricultural trade, providing farmers with fair pricing, better market access and the latest farming resources to enhance productivity and profitability</p>
        </div>
        <div className="section">
          <h4>Our Mission</h4>
          <ul className='about'>
            <li><strong>Empower Farmers:</strong> By eliminating middlemen and ensuring fair trade</li>
            <li><strong>Enhance Market Transparency:</strong> Through real-time auctions and direct farmer-to-buyer transactions</li>
            <li><strong>Secure Payments & Trust:</strong> With an integrated payment gateway for smooth transactions</li>
            <li><strong>Sustainable Growth:</strong> By supporting modern farming techniques and accessible trade solutions</li>
          </ul>
        </div>
        <div className="section">
          <h4>Why AgriTrade?</h4>
          <ul className='about'>
            <li><strong>Live Crop Auctions:</strong> Farmers can sell crops at the best market price</li>
            <li><strong>B2B Marketplace:</strong> Farmers can buy fertilizers, seeds and machinery.</li>
            <li><strong>Secure Payments:</strong> Trusted Payment Gateway ensures fraud-free transactions</li>
            <li><strong>Analytics Dashboard:</strong> Track sales, auctions and product demand</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default About;