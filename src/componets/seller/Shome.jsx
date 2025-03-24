import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';

const Shome = () => {
  const { seller, sellerLogout } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await sellerLogout();
    navigate('/seller/login');
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">Welcome, {seller?.username}!</h2>

      <div className="card p-3 mb-4 shadow">
        <h5>Seller Information</h5>
        <p><strong>Company:</strong> {seller?.companyname}</p>
        <p><strong>Email:</strong> {seller?.email}</p>
        <p><strong>Phone:</strong> {seller?.phno}</p>
      </div>

      <div className="row">

        <div className="col-md-6">
          <div className="card p-3 mb-3 shadow">
            <h5>Order Statistics</h5>
            <p><strong>Pending Orders:</strong> {seller?.ordersCount?.pending || 0}</p>
            <p><strong>Confirmed Orders:</strong> {seller?.ordersCount?.confirmed || 0}</p>
            <p><strong>Shipped Orders:</strong> {seller?.ordersCount?.shipped || 0}</p>
            <p><strong>Delivered Orders:</strong> {seller?.ordersCount?.delivered || 0}</p>
            <p><strong>Cancelled Orders:</strong> {seller?.ordersCount?.cancelled || 0}</p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3 mb-3 shadow">
            <h5>Manage Your Store</h5>
            <Link to="/seller/addproduct" className="btn btn-success w-100 mb-2">Add Product</Link>
            <Link to="/seller/allproducts" className="btn btn-primary w-100 mb-2">View Your Products</Link>
            <Link to="/seller/allorders" className="btn btn-info w-100 mb-2">View Your Orders</Link>
          </div>
        </div>
      </div>
      <div className="row">

        <div className="col-md-6">
          <div className="card p-3 mb-3 shadow">
            <h5>Product Statistics</h5>
            <p><strong>Active Products:</strong> {seller?.activeProductsCount || 0}</p>
            <p><strong>OutOfStock Products:</strong> {seller?.outofstockProductsCount || 0}</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-3 mb-3 shadow">
            <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>Logout</button>
          </div>
        </div>

      </div>



    </div>
  );
};

export default Shome;
