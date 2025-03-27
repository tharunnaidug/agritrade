import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';

const Alluserorders = () => {
  const { user } = useContext(AppContext);
  const [statusFilter, setStatusFilter] = useState("All");

  const orderStatusOptions = ["All", "Placed", "Confirmed", "Shipped", "Delivered", "Cancelled"];

  const filteredOrders = user?.orders
    ? user.orders.filter(order => statusFilter === "All" || order.status === statusFilter)
    : [];

  return (
    <div className="container mt-3">
      <h3 className="text-center">All Orders</h3>

      {/* Status Filter */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <label htmlFor="statusFilter" className="fw-bold">Filter by Status:</label>
        <select
          id="statusFilter"
          className="form-select w-50"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {orderStatusOptions.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      {filteredOrders.length > 0 ? (
        <div className="d-flex flex-column gap-3">
          {filteredOrders.slice().reverse().map((order) => (
            <div key={order._id} className="p-3 rounded shadow-sm" style={{ backgroundColor: '#f8f9fa' }}>
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Status:</strong> 
                <span className={`badge ms-2 ${getStatusBadge(order.status)}`}>{order.status}</span>
              </p>
              <p><strong>Payment:</strong> {order.payment}</p>
              <p><strong>Total Amount:</strong> ₹{order.total}</p>
              <Link to={`/user/order/${order._id}`} className="btn btn-primary btn-sm mt-2">View Order</Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">No orders available</p>
      )}

      <div className="text-center mt-4">
        <Link to='/user/profile' className='btn btn-success m-2'>Back to Profile</Link>
      </div>
    </div>
  );
};

const getStatusBadge = (status) => {
  switch (status) {
    case "Placed": return "bg-primary text-white";
    case "Confirmed": return "bg-info text-dark";
    case "Shipped": return "bg-warning text-dark";
    case "Delivered": return "bg-success text-white";
    case "Cancelled": return "bg-danger text-white";
    default: return "bg-secondary text-white";
  }
};

export default Alluserorders;