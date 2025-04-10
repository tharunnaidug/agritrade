import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { ShoppingCart, Star, StarOff } from 'lucide-react';

const categories = [
  'All', 'Herbicide', 'Pesticide', 'Fungicide',
  'Cereal & Grain Seeds', 'Vegetable Seeds', 'Fruit Seeds', 'Flower & Medicinal Plants',
  'Organic Fertilizer', 'Chemical Fertilizer', 'Soil Conditioner',
  'Hand Tools', 'Irrigation Equipment', 'Machinery',
  'Animal Husbandry & Dairy Farming', 'Greenhouse', 'Smart Farming', 'Packaging & Storage'
];

const Products = () => {
  const navigate = useNavigate();
  const { products, addToCart, isAuth } = useContext(AppContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('default');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (products && products.length > 0) {
      setLoading(false);
      filterAndSortProducts(selectedCategory, sortOrder, searchTerm);
    }
  }, [products, selectedCategory, sortOrder, searchTerm]);

  const filterAndSortProducts = (category, order, search) => {
    let tempProducts = [...products];
    if (category !== 'All') {
      tempProducts = tempProducts.filter(product => product.category === category);
    }
    if (search) {
      tempProducts = tempProducts.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (order === 'low-to-high') {
      tempProducts.sort((a, b) => a.price - b.price);
    } else if (order === 'high-to-low') {
      tempProducts.sort((a, b) => b.price - a.price);
    } else if (order === 'rating') {
      tempProducts.sort((a, b) => parseFloat(b.avgRating || 0) - parseFloat(a.avgRating || 0));
    }
    setFilteredProducts(tempProducts);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return (
      <div className="d-flex align-items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={16} className="text-warning" fill="currentColor" />
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <StarOff key={`empty-${i}`} size={16} className="text-muted" />
        ))}
      </div>
    );
  };

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

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between mb-3 gap-2 flex-wrap">
        <input
          type="text"
          className="form-control w-25 min-w-200"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          title='Search All Products'
        />
        <select
          className="form-select w-25 min-w-200"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          title='Filter By Category'
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select
          className="form-select w-25 min-w-200"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
          <option value="rating">Rating: High to Low</option>
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center">
          <span className='p-2'>No Products Available</span>
        </div>
      ) : (
        <div className="row">
          {filteredProducts.map((product) => (
            <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <Link to={`/product/${product._id}`} className='text-decoration-none'>
                  {product?.imgSrc?.[0] ? (
                    <img
                      src={product.imgSrc[0]}
                      className="card-img-top p-3"
                      alt={product.title}
                      loading="lazy"
                      style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                    />
                  ) : (
                    <div
                      className="no-image p-3 d-flex justify-content-center align-items-center"
                      style={{ height: '200px', backgroundColor: '#f5f5f5' }}
                    >
                      <span>No Image Available</span>
                    </div>
                  )}
                </Link>
                <div className="card-body d-flex flex-column">
                  <Link to={`/product/${product._id}`} className='text-decoration-none mb-2'>
                    <h6 className="card-title mb-1 text-dark">{product.title}</h6>
                    <p className="card-text text-truncate small text-secondary">{product.description}</p>
                    <p className="card-category small text-muted">Category: {product.category || 'Uncategorized'}</p>
                  </Link>
                  <div className="mb-2 d-flex align-items-center gap-2">
                    {renderStars(product.avgRating || 0)}
                    <span className="small text-muted">
                      ({product.numReviews || 0})
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <span className="btn btn-sm btn-primary">₹ {product.price}</span>
                    <span
                      className="btn btn-sm btn-outline-secondary"
                      title='Add to Cart'
                      onClick={() => {
                        if (isAuth) {
                          addToCart(product._id, product.title, product.price, 1, product.imgSrc);
                        } else {
                          navigate('/login');
                        }
                      }}
                    >
                      <ShoppingCart size={18} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;