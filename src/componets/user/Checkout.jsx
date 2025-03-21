import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';

const Checkout = () => {
  const { user, updateAddress } = useContext(AppContext);

  const [formData, setFormData] = useState(user?.address || {
    fullname: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    phno: '',
  });

  
  const [isEditing, setIsEditing] = useState(!user?.address);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });
    await updateAddress(form);
    setIsEditing(false);
  };
  return (
    <div className="container mt-2  bg-success p-3 rounded text-white shadow-sm" style={{ maxWidth: "500px" }}>
      <h2>Checkout</h2>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="card  bg-success p-3 text-white">
          <h4 className='text-white' >{user?.address ? 'Edit Address' : 'Add New Address'}</h4>

          <div className="mb-2">
            <label className="form-label">Full Name</label>
            <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} className="form-control" required placeholder='Your Full Name' />
          </div>

          <div className="mb-2">
            <label className="form-label">Address Line 1</label>
            <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} className="form-control" required placeholder='your address' />
          </div>

          <div className="mb-2">
            <label className="form-label">Address Line 2</label>
            <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} className="form-control" placeholder='optional' />
          </div>

          <div className="mb-2">
            <label className="form-label">City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} className="form-control" required placeholder='your city' />
          </div>

          <div className="mb-2">
            <label className="form-label">State</label>
            <input type="text" name="state" value={formData.state} onChange={handleChange} className="form-control" required placeholder='your state' />
          </div>

          <div className="mb-2">
            <label className="form-label">Country</label>
            <input type="text" name="country" value={"India"} onChange={handleChange} className="form-control" defaultValue={"India"} disabled />
          </div>

          <div className="mb-2">
            <label className="form-label">Pincode</label>
            <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="form-control" required placeholder='your pincode' />
          </div>

          <div className="mb-2">
            <label className="form-label">Phone Number</label>
            <input type="text" name="phno" value={formData.phno} onChange={handleChange} className="form-control" required placeholder='your phone number' />
          </div>

          <button type="submit" className="btn btn-primary mt-2">
            {user?.address ? 'Update Address' : 'Save Address'}
          </button>
        </form>
      ) : (
        <div className="card p-3">
          <h4>Your Shipping Address</h4>
          <p><strong>Full Name:</strong> {formData.fullname}</p>
          <p><strong>Address:</strong> {formData.addressLine1}, {formData.addressLine2}</p>
          <p><strong>City:</strong> {formData.city}, {formData.state}</p>
          <p><strong>Pincode:</strong> {formData.pincode}</p>
          <p><strong>Phone:</strong> {formData.phno}</p>

          <button onClick={() => setIsEditing(true)} className="btn btn-warning mt-2">
            Edit Address
          </button>
        </div>
      )}

      {!isEditing ? (<Link to='/user/payment' className='btn btn-warning mt-3'>
        Proceed to Payment
      </Link>):(<></>)}

    </div>
  );
};

export default Checkout;