import { Link, useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';
import { TriangleAlert } from 'lucide-react';

const Profile = () => {
  const { user, logout, isAuth } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  // console.log(user)

  if (!isAuth) {
    return (<>
      <TriangleAlert className='mt-5' />
      <div className="text-center ">Looks like you are not logged in ..!</div>
      <Link to='/login' className='btn btn-success mt-4'>Login Now</Link>
    </>);
  }

  return (
    <>
      <div className='container mt-3 p-3 rounded' style={{ backgroundColor: '#65ea2a38' }}>
        {user ? (
          <div className="w-100">
            <h2 className='text-center mb-3'>Welcome  {user.name}</h2>
            <h4>Your Info</h4>

            <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start">
              <div className="text-center m-3">
                <img
                  src={user.pic}
                  alt="Profile"
                  className="rounded-circle"
                  width="150"
                  height="150"
                  style={{ objectFit: 'cover', border: '2px solid #65ea2a' }}
                />
              </div>

              <div className="flex-grow-1">
                <div className="d-flex flex-wrap">
                  <p className='m-1 p-2'><strong>Username:</strong> {user.username}</p>
                  <p className='m-1 p-2'><strong>Name:</strong> {user.name}</p>
                  <p className='m-1 p-2'><strong>Gender:</strong> {user.gender || 'N/A'}</p>
                  <p className='m-1 p-2'><strong>DOB:</strong> {user.dob ? new Date(user.dob).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : 'N/A'}</p>
                  <p className='m-1 p-2'><strong>Phone Number:</strong> {user.phno}</p>
                  <p className='m-1 p-2'><strong>Email:</strong> {user.email}</p>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <h5>Your Address:</h5>
              {user.address ? (
                <div className="d-flex flex-wrap rounded p-2" style={{ backgroundColor: '#65ea2a48' }}>
                  <p className='m-1 p-2'><strong>Full Name:</strong> {user.address.fullname}</p>
                  <p className='m-1 p-2'><strong>Line 1:</strong> {user.address.addressLine1}</p>
                  <p className='m-1 p-2'><strong>Line 2:</strong> {user.address.addressLine2}</p>
                  <p className='m-1 p-2'><strong>City:</strong> {user.address.city}</p>
                  <p className='m-1 p-2'><strong>State:</strong> {user.address.state}</p>
                  <p className='m-1 p-2'><strong>Country:</strong> {user.address.country}</p>
                  <p className='m-1 p-2'><strong>Pincode:</strong> {user.address.pincode}</p>
                </div>
              ) : (
                <p>No Address found</p>
              )}
            </div>

            <div className="mt-3">
              <h5>Your Last Orders:</h5>
              {user.orders && user.orders.length > 0 ? (
                <div className="d-flex flex-column gap-2">
                  {/* <Link to='/user/allorders' className='btn btn-success' style={{ maxWidth: '200px' }}>All Orders</Link> */}
                  <div key={user.orders[user.orders.length - 1]._id} className='p-2 rounded' style={{ backgroundColor: '#65ea2a48' }}>
                    <p><strong>Order ID:</strong> {user.orders[user.orders.length - 1]._id}</p>
                    <p><strong>Status:</strong> {user.orders[user.orders.length - 1].status}</p>
                    <p><strong>Payment:</strong> {user.orders[user.orders.length - 1].payment}</p>
                    <p><strong>Total Amount:</strong> {user.orders[user.orders.length - 1].total}</p>
                  </div>
                </div>
              ) : (
                <p>No orders available</p>
              )}
            </div>

          </div>
        ) : (
          <p>No user data available</p>
        )}
      </div>

      <div className="d-flex justify-content-center flex-wrap gap-2 my-3">
        <Link to='/user/updateprofile' className='btn btn-success'>Update Profile</Link>
        <Link to='/user/allorders' className='btn btn-success'>All Orders</Link>
        <Link to='/user/cart' className='btn btn-success'>Cart</Link>
        <button className="btn btn-danger m-1" onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

export default Profile;
