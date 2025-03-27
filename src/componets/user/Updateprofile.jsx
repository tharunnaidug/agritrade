import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';

const UpdateProfile = () => {
  const { user, UpdateUserPro, updateAddress } = useContext(AppContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phno: user?.phno || '',
    gender: user?.gender || '',
    dob: user?.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
    pic: user?.pic || ''
  });

  const [addressData, setAddressData] = useState({
    addressLine1: user?.address?.addressLine1 || '',
    addressLine2: user?.address?.addressLine2 || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    country: 'India',
    pincode: user?.address?.pincode || '',
    phno: user?.address?.phno || ''
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "phno") {
      value = value.replace(/\D/g, ""); 
      value = value ? Number(value) : ""; 
    }
    setFormData({ ...formData, [name]: value });
  };
  
  const handleAddressChange = (e) => {
    let { name, value } = e.target;
    if (name === "phno") {
      value = value.replace(/\D/g, ""); 
      value = value ? Number(value) : "";
    }
    setAddressData({ ...addressData, [name]: value });
  };

  const handleFileUpload = async (file) => {
    const imageData = new FormData();
    imageData.append("image", file);
    const response = await fetch(`https://api.imgbb.com/1/upload?key=9abdfc8259278993fe03e52c22e5bada`, {
      method: "POST",
      body: imageData,
    });
    const data = await response.json();
    return data.data.url;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const uploadedUrl = await handleFileUpload(file);
    if (uploadedUrl) {
      setFormData((prev) => ({ ...prev, pic: uploadedUrl }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await UpdateUserPro(formData);
    await updateAddress(addressData);
    navigate('/user/profile');
  };

  return (
    <div className='container mt-4 p-4 bg-light shadow rounded'>
      <h2 className='text-center mb-4'>Update Profile</h2>
      <form onSubmit={handleSubmit} className='row g-3'>
        <h4>Personal Info</h4>
        <div className='col-md-6'>
          <label className='form-label'>Name</label>
          <input type='text' className='form-control' name='name' value={formData.name} onChange={handleChange} required />
        </div>
        <div className='col-md-6'>
          <label className='form-label'>Email</label>
          <input type='email' className='form-control' name='email' value={formData.email} required />
        </div>
        <div className='col-md-6'>
          <label className='form-label'>Phone Number</label>
          <input type='text' className='form-control' name='phno' value={formData.phno} onChange={handleChange} required />
        </div>
        <div className='col-md-6'>
          <label className='form-label'>Gender</label>
          <select className='form-select' name='gender' value={formData.gender} onChange={handleChange}>
            <option value=''>Select</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
        </div>
        <div className='col-md-6'>
          <label className='form-label'>Date of Birth</label>
          <input type='date' className='form-control' name='dob' value={formData.dob} onChange={handleChange} />
        </div>
        <div className='col-md-12'>
          <label className='form-label'>Profile Picture</label>
          <input type='file' className='form-control' name='pic' onChange={handleFileChange} />
          {formData.pic ? (
            <img src={formData.pic} alt='Profile' className='mt-2 rounded-circle' style={{ width: '100px', height: '100px' }} />
          ) : (
            <p className='mt-2 text-muted'>No photo found</p>
          )}
        </div>
        
        <h4>Address</h4>
        <div className='col-md-6'>
          <label className='form-label'>Address Line 1</label>
          <input type='text' className='form-control' name='addressLine1' value={addressData.addressLine1} onChange={handleAddressChange} required />
        </div>
        <div className='col-md-6'>
          <label className='form-label'>Phone Number</label>
          <input type='text' className='form-control' name='phno' value={addressData.phno} onChange={handleAddressChange} required />
        </div>
        <div className='col-md-6'>
          <label className='form-label'>City</label>
          <input type='text' className='form-control' name='city' value={addressData.city} onChange={handleAddressChange} required />
        </div>
        <div className='col-md-6'>
          <label className='form-label'>State</label>
          <input type='text' className='form-control' name='state' value={addressData.state} onChange={handleAddressChange} required />
        </div>
        <div className='col-md-6'>
          <label className='form-label'>Country</label>
          <input type='text' className='form-control' name='country' value={addressData.country} disabled />
        </div>
        <div className='col-md-6'>
          <label className='form-label'>Pincode</label>
          <input type='text' className='form-control' name='pincode' value={addressData.pincode} onChange={handleAddressChange} required />
        </div>

        <div className='col-12'>
          <button type='submit' className='btn btn-success w-100'>Update Profile</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;