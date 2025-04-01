import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { TriangleAlert } from 'lucide-react';

const Auction = () => {
  const { isAuth, upcomingAuctions } = useContext(AppContext);
  const [featuredAuctions, setFeaturedAuctions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('date');
  const [filteredAuctions, setFilteredAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const data = await upcomingAuctions();
        if (data.message === "success") {
          setFeaturedAuctions(data.upcomingAuctions);
        }
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };
    fetchAuctions();
  }, [upcomingAuctions]);

  useEffect(() => {
    let filtered = [...featuredAuctions];
    
    // Filter based on search term
    if (searchTerm) {
      filtered = filtered.filter((auction) =>
        auction.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        auction.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort based on the selected option
    if (sortOption === 'price') {
      filtered.sort((a, b) => a.baseBid - b.baseBid);
    } else if (sortOption === 'date') {
      filtered.sort((a, b) => new Date(a.auctionDateTime) - new Date(b.auctionDateTime));
    } else if (sortOption === 'quantity') {
      filtered.sort((a, b) => a.qty - b.qty);
    }

    setFilteredAuctions(filtered);
  }, [searchTerm, sortOption, featuredAuctions]);

  if (!isAuth) {
    return (
      <div className="text-center mt-5">
        <TriangleAlert size={50} className="text-danger" />
        <p>Looks like you are not logged in ..!</p>
        <Link to='/login' className='btn btn-success mt-4'>Login Now</Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex flex-wrap gap-3 justify-content-center mb-4">
        <Link to='/addcrop' className='btn btn-primary'>Add Your Crop</Link>
        <Link to='/userlistedauction' className='btn btn-secondary'>Your Listed Auctions</Link>
        <Link to='/userauctions' className='btn btn-warning'>Your Auctions</Link>
      </div>
      
      <h2 className="text-center mb-3">Featured Auctions</h2>

      {/* Search Bar */}
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <input
          type="text"
          className="form-control"
          placeholder="Search for product or description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Sort Dropdown */}
        <select
          className="form-select w-auto ms-3"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="date">Sort by Date</option>
          <option value="price">Sort by Price</option>
          <option value="quantity">Sort by Quantity</option>
        </select>
      </div>

      <div className="row">
        {filteredAuctions.length > 0 ? (
          filteredAuctions.map((auction) => (
            <div key={auction._id} className="col-md-4 mb-4">
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
                  <Link to={`/auction/${auction._id}`} className="btn btn-success w-100">View Auction</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No upcoming auctions found.</p>
        )}
      </div>
    </div>
  );
};

export default Auction;