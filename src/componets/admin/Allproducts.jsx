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
  }, [search, category, products]);

  const uniqueCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-2"
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <h5>{filteredProducts?.length} Product(s) Found</h5>
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="border p-4 rounded shadow-md hover:shadow-lg transition"
          >
            <img
              src={product.imgSrc[0]}
              alt={product.title}
              className="w-full h-40 object-cover mb-2"
              style={{ width: "100px", height: "100px", objectFit: "cover" }} />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-700">{product.category}</p>
            <p className="text-green-600 font-bold">₹ {product.price}</p>
            <p className="text-sm text-gray-500">Qty: {product.qty}</p>
            <p className="text-sm text-gray-500">Seller: {product.seller.username}</p>
            <button 
              className="btn btn-primary mt-2"
              onClick={() => navigate(`/admin/updateproduct/${product._id}`)}
            > Update Product </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;