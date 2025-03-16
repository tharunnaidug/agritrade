import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { toast, Bounce } from 'react-toastify';

const Sallproducts = () => {
  const { sellerAllProducts } = useContext(AppContext);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await sellerAllProducts();
      setProducts(res.product);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      toast.error("Failed to fetch products!", {
        position: "bottom-left",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="mb-4">All Your Products</h2>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products.map((product) => (
            <div key={product._id} className="col" onClick={() => navigate(`/product/${product._id}`)} style={{ cursor: 'pointer' }}>
              <div className="card h-100 shadow-sm border-0">
                <div className="ratio ratio-4x3">
                  {product.imgSrc.length > 0 ? (
                    <img src={product.imgSrc[0]} className="card-img-top" alt={product.title} style={{ objectFit: 'cover' }} />
                  ) : (
                    <div className="d-flex justify-content-center align-items-center bg-light text-muted"> No Image</div>
                  )}
                </div>
                <div className="card-body">
                  <h5 className="card-title text-truncate">{product.title}</h5>
                  <p className="card-text small text-muted mb-2">
                    {product.description.slice(0, 100)}...
                  </p>
                  <p className="card-text mb-1"><strong>₹ {product.price}</strong></p>
                  <p className="card-text text-muted small mb-0">Qty: {product.qty}</p>
                  <p className="card-text text-muted small">Category: {product.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sallproducts;