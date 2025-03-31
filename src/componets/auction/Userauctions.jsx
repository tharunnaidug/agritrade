import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../context/AppContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const UserAuctions = () => {
  const { listedAuctions } = useContext(AppContext);
  const [pastAuctions, setPastAuctions] = useState([]);
  const [upcomingAuctions, setUpcomingAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const data = await listedAuctions();
        if (data.message === "success") {
          setPastAuctions(data.pastAuctions);
          setUpcomingAuctions(data.upcomingAuctions);
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
      <h3 className="text-center">Pending Auctions</h3>
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
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No pending upcoming auctions.</p>
      )}
      
      <div className="text-center mt-4">
        <Link to='/auctionlive' className="btn btn-primary">Your Auctions</Link>
      </div>
      
      <h3 className="text-center mt-4">Past Auctions</h3>
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