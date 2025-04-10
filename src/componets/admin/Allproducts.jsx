import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

const AllProducts = () => {
  const { adminAllProducts } = useContext(AppContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await adminAllProducts();
      if (response?.data?.products) {
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
    if (category !== "All") {
      filtered = filtered.filter((product) => product.category === category);
    }
    setFilteredProducts(filtered);
    setCurrentPage(1); 
  }, [search, category, products]);

  const uniqueCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">All Products</h2>

      <div className="row mb-4 align-items-center">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2 text-end text-muted">
          {filteredProducts.length} product{filteredProducts.length !== 1 && "s"} found
        </div>
      </div>

      <div className="row">
        {currentProducts.map((product) => (
          <div key={product._id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={product.imgSrc[0]}
                className="card-img-top mx-auto mt-3"
                alt={product.title}
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text text-muted mb-1">{product.category}</p>
                <p className="card-text text-success fw-bold mb-1">₹ {product.price}</p>
                <p className="card-text small text-muted mb-1">Qty: {product.qty}</p>
                <p className="card-text small text-muted mb-1">
                  Seller: {product.seller.username}
                </p>
                <p className="card-text small text-warning mb-3">
                  Rating:{" "}
                  {product.avgRating ? (
                    <>
                      {product.avgRating}⭐ ({product.numReviews} review
                      {product.numReviews > 1 ? "s" : ""})
                    </>
                  ) : (
                    "No reviews"
                  )}
                </p>
                <button
                  className="btn btn-success mt-auto"
                  onClick={() => navigate(`/admin/updateproduct/${product._id}`)}
                >
                  Update Product
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="d-flex justify-content-center mt-4">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 && "disabled"}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </button>
            </li>

            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 && "active"}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default AllProducts;