import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { toast, Bounce } from 'react-toastify';

const Sorder = () => {
  const { sellerOrder } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await sellerOrder(id);
      setOrder(res);
    } catch (error) {
      toast.error('Failed to fetch Order!', { position: 'bottom-left', autoClose: 5000, theme: 'dark', transition: Bounce });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return (
    <div className='container mt-4'>
      {loading ? (
        <div className='text-center'>
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      ) : order ? (
        <div className='card shadow-sm'>
          <div className='card-body'>
            <h5 className='card-title'>Order ID: {order._id}</h5>
            <p className='card-text'>
              <strong>Status:</strong> {order.status} <br />
              <strong>Payment:</strong> {order.payment} <br />
              <strong>Total Price:</strong> ₹{order.total?.toFixed(2)} <br />
              <strong>Buyer:</strong> {order.address?.fullname} ({order.address?.pincode}) <br />
              <strong>Address:</strong> {order.address?.addressLine1}, {order.address?.addressLine2} {order.address?.city}, {order.address?.state}, {order.address?.country} - {order.address?.pincode}
            </p>
            <h6>Products:</h6>
            <ul className='list-group'>
              {order.items.map(item => (
                <li key={item._id} className='list-group-item d-flex align-items-center'>
                  <img src={item.imgSrc} alt={item.title} className='me-2' style={{ width: '50px', height: '50px' }} />
                  {item.title} - ₹{item.price} x {item.qty}
                </li>
              ))}
            </ul>
            {(order.status === 'Placed' || order.status === 'Confirmed') && (
              <Link to={`/seller/updateorder/${order._id}`} className='btn btn-primary mt-3'>Update Order</Link>
            )}
          </div>
        </div>
      ) : (
        <p className='text-center'>Order not found.</p>
      )}
    </div>
  );
};

export default Sorder;