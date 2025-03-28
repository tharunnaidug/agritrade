import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";

const statusOrder = ["Placed", "Confirmed", "Shipped", "Delivered", "Cancelled"];

const Allorders = () => {
  const { adminAllOrders } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await adminAllOrders();
      setOrders(response.data);
      setFilteredOrders(response.data);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    let filtered = orders.filter(order => 
      (order._id.includes(searchTerm) || 
      order.status.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.payment.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === "" || order.status === filterStatus)
    );

    setFilteredOrders(filtered);
  }, [searchTerm, filterStatus, orders]);

  if (loading) {
    return <div className="text-center mt-5">Loading orders...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">All Orders</h2>
      
      <div className="d-flex justify-content-between mb-3">
        <input 
          type="text" 
          className="form-control w-50" 
          placeholder="Search by Order ID, Status, or Payment" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <select className="form-select w-25" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All Statuses</option>
          {statusOrder.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div className="d-flex flex-wrap justify-content-center">
        {filteredOrders.map((order) => (
          <div key={order._id} className="card shadow-sm p-3 m-3" style={{ width: "100%", maxWidth: "800px", display: "flex", flexDirection: "row", alignItems: "center" }}>
            <div className="card-body w-100">
              <h5 className="card-title">Order ID: {order._id}</h5>
              <p className="card-text"><strong>Seller:</strong> {order.sellerName}</p>
              <p className="card-text"><strong>Status:</strong> {order.status}</p>
              <p className="card-text"><strong>Payment:</strong> {order.payment}</p>
              <p className="card-text"><strong>Total:</strong> ₹{order.total}</p>
              <h6>Items:</h6>
              {order.items.map((item) => (
                <div key={item._id} className="d-flex align-items-center mb-2 border rounded p-2" style={{ maxWidth: "100%" }}>
                  <img 
                    src={item.imgSrc.split(",")[0]} 
                    alt={item.title} 
                    className="rounded me-2"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                  <div>
                    <p className="mb-0"><strong>{item.title}</strong></p>
                    <p className="mb-0">Qty: {item.qty}</p>
                    <p className="mb-0">Price: ₹{item.price}</p>
                  </div>
                </div>
              ))}
              <h6>Shipping Address:</h6>
              <p className="card-text">{order.address.fullname}, {order.address.addressLine1}, {order.address.city}, {order.address.state} - {order.address.pincode}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Allorders;