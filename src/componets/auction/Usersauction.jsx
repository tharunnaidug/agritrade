import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../context/AppContext';
import { Link } from 'react-router-dom';

const Usersauction = () => {
  const { myAuctions } = useContext(AppContext);
  const [liveAuctions, setLiveAuctions] = useState([]);
  const [upcomingAuctions, setUpcomingAuctions] = useState([]);
  const [pastAuctions, setPastAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAuctions = async () => {
      try {
        const data = await myAuctions();
        if (data.message === "success") {
          setLiveAuctions(data.liveAuctions || []);
          setUpcomingAuctions(data.upcomingAuctions || []);
          setPastAuctions(data.pastAuctions || []);
        }
      } catch (error) {
        console.error("Error fetching user auctions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAuctions();
  }, [myAuctions]);

  if (loading) return <div className="text-center">Loading your auctions...</div>;

  return (
    <div className="container mt-4">
      <h3 className="text-primary">Live Auctions</h3>
      {liveAuctions.length === 0 ? (
        <p className="text-center">No live auctions found.</p>
      ) : (
        <div className="row">
          {liveAuctions.map((auction) => (
            <LiveAuctionCard key={auction._id} auction={auction} />
          ))}
        </div>
      )}


      <h3 className="text-success mt-4">Upcoming Auctions</h3>
      {upcomingAuctions.length === 0 ? (
        <p className="text-center">No upcoming auctions found.</p>
      ) : (
        <div className="row">
          {upcomingAuctions.map((auction) => (
            <UpcomingPastAuctionCard key={auction._id} auction={auction} type="upcoming" />
          ))}
        </div>
      )}

      <h3 className="text-danger mt-4">Past Auctions</h3>
      {pastAuctions.length === 0 ? (
        <p className="text-center">No past auctions found.</p>
      ) : (
        <div className="row">
          {pastAuctions.map((auction) => (
            <UpcomingPastAuctionCard key={auction._id} auction={auction} type="past" />
          ))}
        </div>
      )}
    </div>
  );
};

const LiveAuctionCard = ({ auction }) => (
  <div className="col-md-4 mb-4">
    <div className="card shadow-sm h-100 text-center">
      <img src={auction.imgSrc[0]} className="card-img-top mx-auto" alt={auction.product} style={{ height: '200px', width: "200px", objectFit: 'cover' }} />
      <div className="card-body">
        <h5 className="card-title">{auction.product}</h5>
        <p className="card-text text-truncate" style={{ maxWidth: '100%' }}>{auction.description}</p>
        <p className="fw-bold">Base Bid: ₹{auction.baseBid}</p>
        <p className="text-muted">Auction Date: {new Date(auction.auctionDateTime).toLocaleString()}</p>
        <p className="text-muted">Quantity: {auction.qty} {auction.unit}</p>
        <p className="text-muted">State: {auction.state}</p>
        <p className="text-muted">Payment Mode: {auction.payment}</p>
        <Link to={`/auctionlive/${auction._id}`} className="btn btn-success w-100">View Auction</Link>
      </div>
    </div>
  </div>
);

const UpcomingPastAuctionCard = ({ auction, type }) => (
  <div className="col-md-4 mb-4">
    <div className="card shadow-sm h-100 text-center">
      <img src={auction.imgSrc[0]} className="card-img-top mx-auto" alt={auction.product} style={{ height: '200px', width: "200px", objectFit: 'cover' }} />
      <div className="card-body">
        <h5 className="card-title">{auction.product}</h5>
        <p className="card-text text-truncate" style={{ maxWidth: '100%' }}>{auction.description}</p>
        <p className="fw-bold">Base Bid: ₹{auction.baseBid}</p>
        <p className="text-muted">Auction Date: {new Date(auction.auctionDateTime).toLocaleString()}</p>
        <p className="text-muted">Quantity: {auction.qty} {auction.unit}</p>
        <p className="text-muted">State: {auction.state}</p>
        <p className="text-muted">Payment Mode: {auction.payment}</p>
        <Link to={`/auction/${auction._id}`} className="btn btn-success w-100">
          {type === 'upcoming' ? 'View Upcoming Auction' : 'View Past Auction'}
        </Link>
      </div>
    </div>
  </div>
);

export default Usersauction;