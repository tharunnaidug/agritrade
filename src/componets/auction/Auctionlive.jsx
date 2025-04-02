import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Clock, TriangleAlert } from "lucide-react";
import AppContext from "../../context/AppContext";

const AuctionLive = () => {
  const url = import.meta.env.VITE_API_URL;
  const { viewLiveAuction, placeBid, isAuth, user } = useContext(AppContext);
  const [auction, setAuction] = useState(null);
  const [socket, setSocket] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const { id } = useParams();
  const auctionId = id;

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const liveAuction = await viewLiveAuction(id);
        setAuction(liveAuction.auction);
      } catch (error) {
        console.error("Error fetching live auction:", error);
      }
    };

    fetchAuction();

    const newSocket = io(url);
    setSocket(newSocket);

    newSocket.emit("joinAuction", id);

    newSocket.on("newBid", (data) => {
      console.log(data)
      if (data.auctionId === auctionId) {
        setAuction((prevAuction) => ({
          ...prevAuction,
          bids: [...prevAuction.bids, { bidder: data.bidder, bid: data.bidAmount }],
          highestBid: data.bidAmount,
          highestBidder: data.bidder,
        }));
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [auctionId]);

  const handleBid = async (e) => {
    e.preventDefault();
    if (!bidAmount || isNaN(bidAmount)) {
      return toast.error("Please enter a valid bid amount.");
    }

    const minBid = auction.highestBid ? parseFloat((Number(auction.highestBid) + 0.1).toFixed(2)) : auction.baseBid;
    if (Number(bidAmount) < minBid) {
      return toast.error(`Bid must be at least ₹${minBid}`);
    }

    try {
      const response = await placeBid(auctionId, bidAmount);
      if (response.message=="success") {
        toast.success("Bid placed successfully!");
        setBidAmount("");
      } else {
        toast.error(response?.data?.error || "Failed to place bid.");
      }
    } catch (error) {
      console.error("Error placing bid:", error);
      toast.error(error.response?.data?.error);
    }
  };
  if (!auction) {
    return (
      <div className="text-center mt-5">
        <Clock size={50} className="text-danger" />
        <p>Loading auction details...</p>
      </div>
    );
  }
  return  (
    <div className="container mt-4">
      <ToastContainer />
      <h1 className="text-center mb-4">Live Auction for {auction?.product}</h1>
      <div className="card shadow-sm p-4">
        <div className="text-center">
          <img
            src={auction?.imgSrc[0]}
            alt={auction.product}
            className="img-fluid rounded mb-3"
            style={{ maxHeight: '300px', objectFit: 'cover' }}
          />
        </div>
        <h3>{auction?.product}</h3>
        <p><strong>Base Bid:</strong> ₹{auction?.baseBid}</p>
        <p><strong>Seller:</strong> {auction?.seller?.name}</p>

        <h4 className="mt-4">Bids</h4>
        {auction?.bids?.length > 0 ? (
          <ul className="list-group">
            {auction?.bids?.map((bid, index) => (
              <li key={index} className="list-group-item">
                <strong>Bidder:</strong> {bid.bidder?.name || bid.bidder} <strong>Amount:</strong> ₹{bid.bid}
              </li>
            ))}
          </ul>
        ) : (
          <p>No bids placed yet.</p>
        )}

        <div className="mt-3">
          <p><strong>Highest Bid: </strong>₹{auction?.highestBid || 'N/A'}</p>
          {auction?.highestBidder ? (
            <p><strong>Highest Bidder:</strong> {auction?.highestBidder.name || auction.highestBidder}</p>
          ) : (
            <p>No highest bidder yet.</p>
          )}
        </div>

        {isAuth && user?.id !== auction?.seller?._id && auction?.status === 'Live' && (
          <form onSubmit={handleBid} className="mt-4">
            <div className="mb-3">
              <label className="form-label"><strong>Enter Your Bid (₹)</strong></label>
              <input
                type="number"
                className="form-control"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder={`Min ₹${auction.highestBid  ? parseFloat((Number(auction.highestBid) + 0.1).toFixed(2)) : auction.baseBid}`}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Place Your Bid
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuctionLive;
