import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppContext from "../../context/AppContext";

const statusTransitions = {
  Placed: ["Confirmed", "Cancelled"],
  Confirmed: ["Shipped", "Cancelled"],
  Shipped: ["Delivered", "Cancelled"],
  Delivered: ["Cancelled"],
};

const Updateorder = () => {
  const { adminUpdateOrder, adminAllOrders } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await adminAllOrders();
      const foundOrder = response.data.find((o) => o._id === id);
      setOrder(foundOrder);
      setLoading(false);
    };
    fetchOrder();
  }, [id, adminAllOrders]);

  const handleStatusUpdate = async (newStatus) => {
    await adminUpdateOrder(id, { status: newStatus });
    setOrder((prev) => ({ ...prev, status: newStatus }));
    toast.success(`Order status updated to ${newStatus}`);
  };

  if (loading) return <div className="text-center mt-5">Loading order details...</div>;
  if (!order) return <div className="text-center mt-5">Order not found.</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Update Order</h2>
      <div className="card shadow-sm p-3 m-3">
        <div className="card-body">
          <h5 className="card-title">Order ID: {order._id}</h5>
          <p><strong>Seller:</strong> {order.sellerName}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Payment:</strong> {order.payment}</p>
          <p><strong>Total:</strong> ₹{order.total}</p>
          <h6>Items:</h6>
          {order.items.map((item) => (
            <div key={item._id} className="border rounded p-2 mb-2">
              <p><strong>{item.title}</strong></p>
              <p>Qty: {item.qty}</p>
              <p>Price: ₹{item.price}</p>
            </div>
          ))}
          <h6>Shipping Address:</h6>
          <p>{order.address.fullname}, {order.address.addressLine1}, {order.address.city}, {order.address.state} - {order.address.pincode}</p>
          <div className="mt-3">
            {statusTransitions[order.status]?.map((newStatus) => (
              <button 
                key={newStatus} 
                className="btn btn-primary me-2" 
                onClick={() => handleStatusUpdate(newStatus)}
              > Mark as {newStatus}
              </button>
            ))}
          </div>
          <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default Updateorder;