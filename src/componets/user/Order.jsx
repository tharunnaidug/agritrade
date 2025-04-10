import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { toast, Bounce } from 'react-toastify';
import ReviewSection from "../Reviewsection.jsx";


const Order = () => {
  const { userOrder, cancelOrder, setUserReload } = useContext(AppContext);
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const res = await userOrder(id);
      setOrder(res);
    } catch (error) {
      toast.error('Failed to fetch Order!', { position: 'bottom-left', autoClose: 5000, theme: 'dark', transition: Bounce });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const handleCancelOrder = async () => {
    if (!order || cancelling) return;

    setCancelling(true);
    try {
      await cancelOrder(order._id);
      toast.success('Order cancelled successfully!', { position: 'bottom-left', autoClose: 5000, theme: 'dark', transition: Bounce });
      setUserReload(true);
      setOrder(prev => ({ ...prev, status: 'Cancelled', updatedAt: new Date().toISOString() }));
    } catch (error) {
      toast.error('Failed to cancel Order!', { position: 'bottom-left', autoClose: 5000, theme: 'dark', transition: Bounce });
    } finally {
      setCancelling(false);
    }
  };
  console.log(order)
  return (
    <div className="container mt-4">
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : order ? (
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Order ID: {order._id}</h5>
            <p><strong>Seller:</strong> {order.sellerName}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Payment:</strong> {order.payment}</p>
            <p><strong>Shipping Address:</strong> {order.address?.fullname}, {order.address?.addressLine1}, {order.address?.city}, {order.address?.state} - {order.address?.pincode}</p>

            <h6>Products:</h6>
            <ul className="list-group">
              {order.items.map(item => (
                <li key={item.productId._id} className="list-group-item">
                  <div className="d-flex align-items-start">
                    <img
                      src={item.imgSrc.includes(',') ? item.imgSrc.split(',')[0] : item.imgSrc}
                      alt={item.title}
                      className="me-2"
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                    <div>
                      <p className="mb-1">{item.title} - ₹{item.price} x {item.qty}</p>
                      {order.status === "Delivered" && (
                        <ReviewSection
                          productId={item.productId._id}
                          userId={order.userId}
                        />
                      )}
                    </div>
                  </div>
                </li>
              ))}
              <p><strong>Total Price:</strong> ₹{order.total?.toFixed(2)}</p>
            </ul>

            <p><strong>Order Placed:</strong> {formatDateTime(order.createdAt)}</p>
            <p><strong>Last Updated:</strong> {formatDateTime(order.updatedAt)}</p>

            {(order.status === 'Placed' || order.status === 'Confirmed') && (
              <button
                className="btn btn-danger mt-3"
                onClick={handleCancelOrder}
                disabled={cancelling}
              >
                {cancelling ? 'Cancelling...' : 'Cancel Order'}
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center">Order not found.</p>
      )}
    </div>
  );

};

export default Order;