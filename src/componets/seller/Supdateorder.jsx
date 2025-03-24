import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { toast, Bounce } from 'react-toastify';

const Supdateorder = () => {
  const { updateOrder, sellerOrder } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await sellerOrder(id);
        setOrder(res);
      } catch (error) {
        toast.error('Failed to fetch order!', { position: 'bottom-left', autoClose: 5000, theme: 'dark', transition: Bounce });
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleUpdateStatus = async (status) => {
    try {
      await updateOrder(id, { status });
      toast.success(`Order status updated to ${status}!`, { position: 'bottom-left', autoClose: 5000, theme: 'dark', transition: Bounce });
      navigate(-1);
    } catch (error) {
      toast.error('Failed to update order status!', { position: 'bottom-left', autoClose: 5000, theme: 'dark', transition: Bounce });
    }
  };

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
            <p className='card-text'><strong>Current Status:</strong> {order.status}</p>
            {order.status === 'Placed' && (
              <>
                <button className='btn btn-success me-2' onClick={() => handleUpdateStatus('Confirmed')}>Confirm</button>
                <button className='btn btn-danger' onClick={() => handleUpdateStatus('Cancelled')}>Cancel</button>
              </>
            )}
            {order.status === 'Confirmed' && (
              <button className='btn btn-warning' onClick={() => handleUpdateStatus('Shipped')}>Ship Order</button>
            )}
          </div>
        </div>
      ) : (
        <p className='text-center'>Order not found.</p>
      )}
    </div>
  );
};

export default Supdateorder;