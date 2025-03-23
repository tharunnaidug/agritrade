import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';

const Sallorders = () => {
  const { sellerAllOrders } = useContext(AppContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className='container mt-4'>
      <h2 className='mb-4 text-primary'>All Orders</h2>
      {loading ? (
        <div className='text-center mt-4'>
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      ) : orders.length === 0 ? (
        <div className='text-center mt-4'>
          <h5 className='text-muted'>No orders available</h5>
        </div>
      ) : (
        <div className='row'>
          {orders.map(order => (
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
                  <button className='btn btn-primary btn-sm' onClick={() => navigate(`/seller/order/${order._id}`)}>View Order</button>
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