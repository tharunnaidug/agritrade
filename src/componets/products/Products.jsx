import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { ShoppingCart } from 'lucide-react';

const Products = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { products, addToCart, isAuth } = useContext(AppContext);

  useEffect(() => {
    if (products && products.length > 0) {
      setLoading(false);
    }
  }, [products]);

  if (loading) {
    return (
      <div className="container mt-3 d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className='p-2'>Loading</span>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container mt-3 d-flex justify-content-center align-items-center">
        <span className='p-2'>No Products Available</span>
      </div>
    );
  }

  return (
    <div className="container mt-3">
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card h-100 cursor-pointer text-capitalize">
              <Link to={`/product/${product._id}`} className='text-decoration-none'>
                {product.imgSrc[0] && product?.imgSrc?.length > 0 ? (
                  <img src={product.imgSrc} className="card-img-top fw-bolder p-3" alt={product.title} style={{ height: '200px', objectFit: 'cover', width: '100%' }} />
                ) : (
                  <div className="no-image p-3 d-flex justify-content-center align-items-center" style={{ height: '200px', backgroundColor: '#f5f5f5' }}>
                    <span>No Image Available</span>
                  </div>
                )}
              </Link>
              <div className="card-body d-flex flex-column" style={{ color: "black" }}>
                <Link to={`/product/${product._id}`} className='text-decoration-none'>
                  <h5 className="card-title" style={{ color: "black" }}>{product.title}</h5>
                  <p className="card-text text-truncate" style={{ color: "black" }}>{product.description}</p>
                  <p className="card-category text-muted">Category: {product.category || 'Uncategorized'}</p>
                </Link>
                <div className='d-flex'>
                  <span className="btn btn-primary mt-auto">₹ {product.price}</span>
                  <span className="btn mt-auto" style={{ marginLeft: "10px" }} onClick={() => {
                    if (isAuth) { addToCart(product._id, product.title, product.price, 1, product.imgSrc); }
                    else { navigate('/login'); }
                  }}>
                    <span title='Add to Cart'><ShoppingCart /></span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
