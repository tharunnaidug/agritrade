import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { toast, Bounce } from 'react-toastify';

const Sallproducts = () => {
  const { sellerAllProducts } = useContext(AppContext);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('');
  const [filterRating, setFilterRating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await sellerAllProducts();
      const rawProducts = Array.isArray(res?.product) ? res.product : [];
      const activeProducts = rawProducts.filter(product => product.status !== 'deleted');
      setProducts(activeProducts);
      setFilteredProducts(activeProducts);
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

  useEffect(() => {
    if (!Array.isArray(products)) return;

    let sorted = [...products];

    if (filterRating) {
      sorted = sorted.filter(p => parseFloat(p.avgRating || 0) >= 4);
    }

    if (searchQuery.trim()) {
      sorted = sorted.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortOption) {
      case 'price-low-high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating-high-low':
        sorted.sort((a, b) => parseFloat(b.avgRating || 0) - parseFloat(a.avgRating || 0));
        break;
      default:
        break;
    }

    setFilteredProducts(sorted);
    setCurrentPage(1); 
  }, [sortOption, filterRating, searchQuery, products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="m-4">All Your Products</h2>

      <div className="d-flex flex-wrap align-items-center gap-3 mb-4 ms-3">
        <input
          type="text"
          placeholder="Search by title"
          className="form-control w-auto"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="form-select w-auto"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="rating-high-low">Rating: High to Low</option>
        </select>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="ratingFilter"
            checked={filterRating}
            onChange={() => setFilterRating(prev => !prev)}
          />
          <label className="form-check-label" htmlFor="ratingFilter">
            4★ & above
          </label>
        </div>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : currentProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {currentProducts.map((product) => (
              <div
                key={product._id}
                className="col"
                onClick={() => navigate(`/seller/updateproduct/${product._id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card h-100 shadow-sm border-0">
                  <div className="ratio ratio-4x3">
                    {product.imgSrc?.length > 0 ? (
                      <img
                        src={product.imgSrc[0]}
                        className="card-img-top"
                        alt={product.title}
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="d-flex justify-content-center align-items-center bg-light text-muted">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="card-body">
                    <h5 className="card-title text-truncate">{product.title}</h5>
                    <p className="card-text small text-muted mb-2">
                      {product.description?.slice(0, 100)}...
                    </p>
                    <p className="card-text mb-1"><strong>₹ {product.price}</strong></p>
                    <p className="card-text text-muted small mb-0">Qty: {product.qty}</p>
                    <p className="card-text text-muted small">Category: {product.category}</p>
                    <p className="card-text text-muted small">Status: {product.status}</p>
                    <p className="card-text text-muted small mb-0">
                      ⭐ Rating: {product.avgRating ?? "N/A"} ({product.numReviews} review{product.numReviews === 1 ? '' : 's'})
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
            <button
              className="btn btn-outline-secondary"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Prev
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              className="btn btn-outline-secondary"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Sallproducts;