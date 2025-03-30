import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";

const AllSellers = () => {
  const { adminAllSellers } = useContext(AppContext);
  const [sellers, setSellers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchSellers = async () => {
      const response = await adminAllSellers();
      if (response?.sellers) {
        setSellers(response.sellers);
      }
    };
    fetchSellers();
  }, [adminAllSellers]);

  const filteredSellers = sellers.filter((seller) =>
    seller.username.toLowerCase().includes(search.toLowerCase()) ||
    seller.email.toLowerCase().includes(search.toLowerCase()) ||
    seller.companyname.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">All Sellers</h1>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by company name, username, or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="row">
        <h5>{filteredSellers.length} Seller(s) found</h5>
        {filteredSellers.length > 0 ? (
          filteredSellers.map((seller) => (
            <div key={seller._id} className="col-md-4 mb-4">
              <div className="card shadow-sm text-center">
                <img 
                  src={seller.pic} 
                  alt="Profile" 
                  className="card-img-top mx-auto mt-3 rounded-circle" 
                  style={{ height: "150px", width: "150px", objectFit: "cover" }} 
                />
                <div className="card-body">
                  <h5 className="card-title">{seller.companyname}</h5>
                  <p className="card-text"><strong>Username:</strong> {seller.username}</p>
                  <p className="card-text"><strong>Email:</strong> {seller.email}</p>
                  <p className="card-text"><strong>Phone:</strong> {seller.phno}</p>
                  <p className="card-text"><strong>Joined On:</strong> {new Date(seller.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No sellers found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllSellers;
