import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import  AppContext  from '../context/AppContext'; 

const Homepreview = () => {
  const [auctions, setAuctions] = useState([]);
  const [products, setProducts] = useState([]);
  const url = import.meta.env.VITE_API_URL;

  const { isAuth } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const auctionRes = await axios.get(`${url}/auction/upcomingAuctions`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        setAuctions(auctionRes.data.upcomingAuctions || []);

        const productRes = await axios.get(`${url}/products/bestselling`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        setProducts(productRes.data.products || []);
      } catch (error) {
        console.error('Error fetching home preview data:', error);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div className="container mt-5">
      <h3>🗓️ Upcoming Auctions</h3>
      {auctions.length === 0 ? <p>No Upcoming Auctions. Stay Tuned!</p> : null}
      <div className="row">
        {auctions.map((auction, idx) => (
          <div className="col-md-4" key={idx}>
            <div className="card mb-3 shadow">
              <img
                src={auction.imgSrc}
                alt={auction.product}
                className="card-img-top mx-auto d-block"
                style={{ height: '150px', width: '150px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5>{auction.product}</h5>
                <p>Starts: {new Date(auction.auctionDateTime).toLocaleString()}</p>
                {isAuth ? (
                  <Link to={`/auction/${auction._id}`} className="btn btn-sm btn-outline-success">View</Link>
                ) : (
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => navigate('/login')}
                  >
                    Login to View
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="mt-5">🌿 Best-Selling Products</h3>
      <div className="row">
        {products.map((product, idx) => (
          <div className="col-md-3" key={idx}>
            <div className="card mb-3 shadow-sm">
              <img
                src={product.imgSrc}
                alt={product.title}
                className="card-img-top mx-auto d-block"
                style={{ height: '150px', width: '150px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h6>{product.title}</h6>
                <p className="text-success">₹{product.price}</p>
                <Link to={`/product/${product._id}`} className="btn btn-sm btn-success">Buy</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link to={`/products`} className="btn btn-sm btn-success">Explore Marketplace</Link>
    </div>
  );
};

export default Homepreview;
