import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { TriangleAlert } from 'lucide-react';

const Auctioninfo = () => {
    const { isAuth, viewAuctionInfo, user, interested } = useContext(AppContext);
    const { id } = useParams();
    const [auction, setAuction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isInterested, setIsInterested] = useState(false);

    useEffect(() => {
        const fetchAuction = async () => {
            try {
                const data = await viewAuctionInfo(id);
                if (data.message === "success") {
                    setAuction(data.auction);
                    setIsInterested(data.auction.interestedUsers.includes(user?.id));
                }
            } catch (error) {
                console.error("Error fetching auction details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAuction();
    }, [id, viewAuctionInfo, user?.id]);

    const handleInterested = async () => {
        try {
            await interested(id);
            setIsInterested(true);
        } catch (error) {
            console.error("Error marking interest:", error);
        }
    };

    if (!isAuth) {
        return (
            <div className="text-center mt-5">
                <TriangleAlert size={50} className="text-danger" />
                <p>You need to log in to view auction details.</p>
                <Link to='/login' className='btn btn-success mt-4'>Login Now</Link>
            </div>
        );
    }

    if (loading) {
        return <div className="text-center mt-5">Loading auction details...</div>;
    }

    if (!auction) {
        return <div className="text-center mt-5">Auction not found.</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Auction Details</h2>
            <div className="card shadow-sm p-4">
                <div className="text-center">
                    <img 
                        src={auction.imgSrc[0]} 
                        alt={auction.product} 
                        className="img-fluid rounded mb-3" 
                        style={{ maxHeight: '300px', objectFit: 'cover' }}
                    />
                </div>
                <h3>{auction.product}</h3>
                <p><strong>Description:</strong> {auction.description}</p>
                <p><strong>Base Bid:</strong> ₹{auction.baseBid}</p>
                <p><strong>Quantity:</strong> {auction.qty} {auction.unit}</p>
                <p><strong>State:</strong> {auction.state}</p>
                <p><strong>Payment Method:</strong> {auction.payment}</p>
                <p><strong>Auction Date:</strong> {new Date(auction.auctionDateTime).toLocaleString()}</p>
                <p><strong>Status:</strong> {auction.status}</p>
                <p><strong>Seller:</strong> {auction.seller.name}</p>
                <p><strong>Comments:</strong> {auction.comment}</p>
                
                <div className="mt-3">
                    {auction.seller._id === user?.id ? (
                        <p className="text-muted">Number of Interested Users: {auction.interestedUsers?.length}</p>
                    ) : isInterested ? (
                        <p className="text-success">You will be notified before the auction starts.</p>
                    ) : (
                        <button className="btn btn-success" onClick={handleInterested}>I'm Interested</button>
                    )}
                </div>

                <h4 className="mt-4">Bids</h4>
                {auction.bids.length > 0 ? (
                    <ul className="list-group">
                        {auction.bids.map((bid, index) => (
                            <li key={index} className="list-group-item">
                                <strong>Bidder:</strong> {bid.bidderName} - <strong>Amount:</strong> ₹{bid.amount}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No bids placed yet.</p>
                )}
            </div>
        </div>
    );
};

export default Auctioninfo;