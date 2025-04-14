import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';

const Sallorders = () => {
  const { sellerAllOrders } = useContext(AppContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [statusFilter, setStatusFilter] = useState('All');

  const orderStatusOptions = [
    "All", "Placed", "Confirmed", "Shipped", "Delivered", "Cancelled"
  ];

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await sellerAllOrders();
      setOrders(res.orders || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      toast.error('Failed to fetch Orders!', {
        position: 'bottom-left',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    let result = [...orders];

    if (searchTerm) {
      result = result.filter(order =>
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.addressDetails?.fullname.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'All') {
      result = result.filter(order => order.status === statusFilter);
    }

    result.sort((a, b) => {
      const priceA = a.total || 0;
      const priceB = b.total || 0;
      return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });

    setFilteredOrders(result);
  }, [orders, searchTerm, sortOrder, statusFilter]);

  return (
    <div className='container mt-4'>
      <h2 className='mb-4 text-primary'>All Orders</h2>

      <div className="row mb-4 g-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by buyer or order ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {orderStatusOptions.map((status, idx) => (
              <option key={idx} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Sort by Price: Low to High</option>
            <option value="desc">Sort by Price: High to Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className='text-center mt-4'>
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className='text-center mt-4'>
          <h5 className='text-muted'>No matching orders found</h5>
        </div>
      ) : (
        <div className='row'>
          {filteredOrders.map(order => (
            <div key={order._id} className='col-12 col-md-6 col-lg-4 mb-4'>
              <div className='card shadow-sm'>
                <div className='card-body'>
                  <h5 className='card-title'>Order ID: {order._id}</h5>
                  <p className='card-text'>
                    <strong>Products:</strong> {order?.items?.length} <br />
                    <strong>Total Price:</strong> ₹{order.total?.toFixed(2)} <br />
                    <strong>Status:</strong> {order.status} <br />
                    <strong>Buyer:</strong> {order.addressDetails?.fullname} ({order.addressDetails?.pincode})
                  </p>
                  <button
                    className='btn btn-primary btn-sm'
                    onClick={() => navigate(`/seller/order/${order._id}`)}
                  >
                    View Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sallorders;
