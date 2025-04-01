import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../context/AppContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const UserAuctions = () => {
  const { listedAuctions } = useContext(AppContext);
  const [liveAuctions, setLiveAuctions] = useState([]);
  const [pastAuctions, setPastAuctions] = useState([]);
  const [upcomingAuctions, setUpcomingAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const data = await listedAuctions();
        if (data.message === "success") {
          setLiveAuctions(data.liveAuctions || []);
          setPastAuctions(data.pastAuctions || []);
          setUpcomingAuctions(data.upcomingAuctions || []);
        }
      } catch (error) {
        toast.error("Failed to load auctions");
        console.error("Error fetching auctions:", error);
      }
    };
    fetchAuctions();
  }, [listedAuctions]);

  const truncateText = (text, wordLimit) => {
    return text.split(" ").slice(0, wordLimit).join(" ") + (text.split(" ").length > wordLimit ? "..." : "");
  };

  return (
    <div className="container mt-3">
      <h3 className="text-primary text-center">Live Auctions</h3>
      {liveAuctions.length > 0 ? (
        liveAuctions.map((auction) => (
          <div key={auction._id} className="card mb-3 text-center">
            <img
              src={auction.imgSrc[0]}
              alt={auction.product}
              className="card-img-top mx-auto d-block"
              style={{ maxHeight: '200px', width: '200px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">{auction.product}</h5>
              <p className="card-text">{truncateText(auction.description, 20)}</p>
              <p className="card-text"><strong>Base Bid:</strong> ₹{auction.baseBid}</p>
              <p className="card-text"><strong>Status:</strong> {auction.status}</p>
              <Link to={`/auctionlive/${auction._id}`} className="btn btn-success">View Live Auction</Link>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No live auctions found.</p>
      )}

      <h3 className="text-success text-center mt-4">Upcoming Auctions</h3>
      {upcomingAuctions.length > 0 ? (
        upcomingAuctions.map((auction) => (
          <div key={auction._id} className="card mb-3 text-center">
            <img
              src={auction.imgSrc[0]}
              alt={auction.product}
              className="card-img-top mx-auto d-block"
              style={{ maxHeight: '200px', width: '200px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">{auction.product}</h5>
              <p className="card-text">{truncateText(auction.description, 20)}</p>
              <p className="card-text"><strong>Base Bid:</strong> ₹{auction.baseBid}</p>
              <p className="card-text"><strong>Status:</strong> {auction.status}</p>
              <Link to={`/auction/${auction._id}`} className="btn btn-success">View Auction</Link>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No upcoming auctions found.</p>
      )}

      <h3 className="text-danger text-center mt-4">Past Auctions</h3>
      {pastAuctions.length > 0 ? (
        pastAuctions.map((auction) => (
          <div key={auction._id} className="card mb-3 text-center">
            <img
              src={auction.imgSrc[0]}
              alt={auction.product}
              className="card-img-top mx-auto d-block"
              style={{ maxHeight: '200px', width: '200px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">{auction.product}</h5>
              <p className="card-text">{truncateText(auction.description, 20)}</p>
              <p className="card-text"><strong>Base Bid:</strong> ₹{auction.baseBid}</p>
              <p className="card-text"><strong>Status:</strong> {auction.status}</p>
              <Link to={`/auction/${auction._id}`} className="btn btn-danger">View Past Auction</Link>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No past auctions found.</p>
      )}
    </div>
  );
};

export default UserAuctions;
