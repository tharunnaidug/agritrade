import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
  "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep",
  "Delhi", "Puducherry"
];

const statuses = ["Not Approved", "Scheduled", "Live", "Ended", "Rejected"];

const UpdateAuction = () => {
  const { viewAuctionInfo, adminUpdateAuction } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    auctionId: id,
    product: "",
    description: "",
    baseBid: "",
    auctionDateTime: "",
    additionalInfo: "",
    state: "",
    payment: "",
    status: ""
  });

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const data = await viewAuctionInfo(id);
        if (data.message === "success") {
          setAuction(data.auction);
          setFormData({
            auctionId: id,
            product: data.auction.product,
            description: data.auction.description,
            baseBid: data.auction.baseBid,
            auctionDateTime: new Date(data.auction.auctionDateTime).toISOString().slice(0, 16),
            additionalInfo: data.auction.comment,
            state: data.auction.state,
            payment: data.auction.payment,
            status: data.auction.status
          });
        }
      } catch (error) {
        console.error("Error fetching auction details:", error);
        toast.error("Failed to load auction details!");
      } finally {
        setLoading(false);
      }
    };

    fetchAuction();
  }, [id, viewAuctionInfo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key] !== "") {
          updatedData.append(key, formData[key]);
        }
      });

      const response = await adminUpdateAuction(id, formData);

      if (response.message === "success") {
        toast.success("Auction updated successfully!");
        setIsEditing(false);
        navigate("/admin/allauctions");
      } else {
        toast.error(error.response?.data?.error || "Failed to update auction");
      }
    } catch (error) {
      console.error("Error updating auction:", error);
      toast.error("Something went wrong! Try again.");
    }
  };

  if (loading) return <div className="text-center mt-4">Loading auction details...</div>;
  if (!auction) return <div className="text-center mt-4">Auction not found.</div>;

  return (
    <div className="container mt-3">
      <h3 className="text-center">Auction Details</h3>
      {!isEditing ? (
        <div className="card p-4 shadow-sm">
          <h5 className="text-primary text-center">Seller: {auction.seller.name}</h5>

          <div className="d-flex justify-content-center flex-wrap my-3">
            {auction.imgSrc.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${auction.product} ${index + 1}`}
                className="rounded m-2"
                style={{ width: "200px", height: "150px", objectFit: "cover" }}
              />
            ))}
          </div>

          <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>Product:</strong> {auction.product}</li>
            <li className="list-group-item"><strong>Description:</strong> {auction.description}</li>
            <li className="list-group-item"><strong>Base Bid:</strong> ₹{auction.baseBid}</li>
            <li className="list-group-item"><strong>Quantity:</strong> {auction.qty} {auction.unit}</li>
            <li className="list-group-item"><strong>Status:</strong> {auction.status}</li>
            <li className="list-group-item"><strong>State:</strong> {auction.state}</li>
            <li className="list-group-item"><strong>Payment Mode:</strong> {auction.payment}</li>
            <li className="list-group-item"><strong>Interested Users:</strong> {auction.interestedUsers.length}</li>
            <li className="list-group-item"><strong>Auction Date:</strong> {new Date(auction.auctionDateTime).toLocaleString()}</li>
          </ul>

          <button className="btn btn-warning mt-3" onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      ) : (
        <div className="card p-4 shadow-sm">
          <h4 className="text-center">Edit Auction</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Product</label>
              <input type="text" className="form-control" name="product" value={formData.product} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Base Bid (₹)</label>
              <input type="number" className="form-control" name="baseBid" value={formData.baseBid} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Auction Date</label>
              <input type="datetime-local" className="form-control" name="auctionDateTime" value={formData.auctionDateTime} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Additional Info</label>
              <textarea className="form-control" name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">State</label>
              <select className="form-control" name="state" value={formData.state} onChange={handleChange} required>
                {indianStates.map((state) => <option key={state} value={state}>{state}</option>)}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Payment Mode</label>
              <select className="form-control" name="payment" value={formData.payment} onChange={handleChange} required>
                <option value="Cash">Cash</option>
                <option value="Online">Online (Agritrade)</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Status</label>
              <select className="form-control" name="status" value={formData.status} onChange={handleChange} required>
                {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-100">Update Auction</button>
            <button type="button" className="btn btn-secondary w-100 mt-2" onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateAuction;
