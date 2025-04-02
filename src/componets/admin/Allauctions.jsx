import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

const AllAuctions = () => {
  const { adminAllAuctions } = useContext(AppContext);
  const navigate = useNavigate();
  const [auctions, setAuctions] = useState({
    pastAuctions: [],
    upcomingAuctions: [],
    liveAuctions: [],
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortStatus, setSortStatus] = useState("");

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const data = await adminAllAuctions();
        if (data.data.message === "success") {
          setAuctions({
            pastAuctions: data.data.pastAuctions || [],
            upcomingAuctions: data.data.upcomingAuctions || [],
            liveAuctions: data.data.liveAuctions || [],
          });
        }
      } catch (error) {
        console.error("Error fetching auctions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, [adminAllAuctions]);

  const filterAuctions = (list) => {
    return list.filter(
      (auction) =>
        auction.product.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (sortStatus ? auction.status === sortStatus : true)
    );
  };

  if (loading) return <div className="text-center mt-4">Loading auctions...</div>;

  return (
    <div className="container mt-3">
      <h3 className="text-center">All Auctions</h3>

      <div className="d-flex flex-column flex-md-row justify-content-between mb-4">
        <input
          type="text"
          className="form-control w-100 w-md-50 mb-2 mb-md-0 "
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="form-control w-100 w-md-25"
          value={sortStatus}
          onChange={(e) => setSortStatus(e.target.value)}
        >
          <option value="">Sort by Status</option>
          <option value="Not Approved">Not Approved</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Live">Live</option>
          <option value="Ended">Ended</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <h4 className="mt-4">Live Auctions</h4>
      <div className="row">
        {filterAuctions(auctions.liveAuctions).length > 0 ? (
          filterAuctions(auctions.liveAuctions).map((auction) => (
            <div key={auction._id} className="col-md-4 col-lg-3 mb-4">
              <div className="card p-3 text-center shadow-sm">
                <h5 className="text-truncate">{auction.product}</h5>
                <img
                  src={auction.imgSrc[0]}
                  alt={auction.product}
                  className="img-fluid rounded mx-auto d-block"
                  style={{ height: "150px", objectFit: "cover" }}
                />
                <p className="text-muted">{auction.description}</p>
                <p><strong>Base Bid:</strong> ₹{auction.baseBid}</p>
                <p><strong>Status:</strong> {auction.status}</p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate(`/auctionlive/${auction._id}`)}
                >
                  View Live
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate(`/admin/updateauction/${auction._id}`)}
                >
                  Update
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-12">No live auctions available.</p>
        )}
      </div>

      <h4 className="mt-4">Upcoming Auctions</h4>
      <div className="row">
        {filterAuctions(auctions.upcomingAuctions).length > 0 ? (
          filterAuctions(auctions.upcomingAuctions).map((auction) => (
            <div key={auction._id} className="col-md-4 col-lg-3 mb-4">
              <div className="card p-3 text-center shadow-sm">
                <h5 className="text-truncate">{auction.product}</h5>
                <img
                  src={auction.imgSrc[0]}
                  alt={auction.product}
                  className="img-fluid rounded mx-auto d-block"
                  style={{ height: "150px", objectFit: "cover" }}
                />
                <p className="text-muted">{auction.description}</p>
                <p><strong>Base Bid:</strong> ₹{auction.baseBid}</p>
                <p><strong>Status:</strong> {auction.status}</p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate(`/admin/updateauction/${auction._id}`)}
                >
                  Update
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-12">No upcoming auctions.</p>
        )}
      </div>

      <h4 className="mt-4">Past Auctions</h4>
      <div className="row">
        {filterAuctions(auctions.pastAuctions).length > 0 ? (
          filterAuctions(auctions.pastAuctions).map((auction) => (
            <div key={auction._id} className="col-md-4 col-lg-3 mb-4">
              <div className="card p-3 text-center shadow-sm">
                <h5 className="text-truncate">{auction.product}</h5>
                <img
                  src={auction.imgSrc[0]}
                  alt={auction.product}
                  className="img-fluid rounded mx-auto d-block"
                  style={{ height: "150px", objectFit: "cover" }}
                />
                <p className="text-muted">{auction.description}</p>
                <p><strong>Base Bid:</strong> ₹{auction.baseBid}</p>
                <p><strong>Status:</strong> {auction.status}</p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate(`/auction/${auction._id}`)}
                >
                  View Auction
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-12">No past auctions.</p>
        )}
      </div>
    </div>
  );
};

export default AllAuctions;