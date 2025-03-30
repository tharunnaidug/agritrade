import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";

const AllUsers = () => {
  const { adminAllUsers } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await adminAllUsers();
      if (response?.users) {
        setUsers(response.users);
      }
    };
    fetchUsers();
  }, [adminAllUsers]);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">All Users</h1>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name, username, or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="row">
        <h5>{filteredUsers.length} User(s) found</h5>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user._id} className="col-md-4 mb-4">
              <div className="card shadow-sm text-center">
                <img 
                  src={user.pic} 
                  alt="Profile" 
                  className="card-img-top mx-auto mt-3 rounded-circle" 
                  style={{ height: "150px", width: "150px", objectFit: "cover" }} 
                />
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text"><strong>Username:</strong> {user.username}</p>
                  <p className="card-text"><strong>Email:</strong> {user.email}</p>
                  <p className="card-text"><strong>Phone:</strong> {user.phno}</p>
                  <p className="card-text"><strong>Gender:</strong> {user.gender}</p>
                  <p className="card-text"><strong>DOB:</strong> {new Date(user.dob).toLocaleDateString()}</p>
                  <p className="card-text"><strong>Seller:</strong> {user.seller ? "Yes" : "No"}</p>
                  <p className="card-text"><strong>Joined On:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No users found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
