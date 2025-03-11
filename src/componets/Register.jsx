import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Otp from './Otp';
import AppContext from '../context/AppContext';

const Register = () => {
  const { register, sendOtp } = useContext(AppContext);
  const [otpSent, setOtpSent] = useState(false);
  const [receivedOtp, setReceivedOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phno: '',
    dob: '',
    profilePic: '',
    gender: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      setErrors((prev) => ({ ...prev, email: 'Email is required to send OTP' }));
      return;
    }
    try {
      const data = await sendOtp(formData.email);
      setReceivedOtp(data.otp);
      setOtpSent(true);
    } catch (error) {
      console.error("Failed to send OTP", error);
    }
  };

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const response = await fetch(`https://api.imgbb.com/1/upload?key=9abdfc8259278993fe03e52c22e5bada`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data.data.url;
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const uploadedUrl = await handleFileUpload(file);
    if (uploadedUrl) {
      setFormData((prev) => ({ ...prev, profilePic: uploadedUrl }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Full Name is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password && formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.phno) newErrors.phno = 'Phone Number is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const data = await register(formData);
      if (data?.error) {
        const newErrors = {};
        if (data.error.includes('Username')) newErrors.username = 'Username already exists';
        if (data.error.includes('Email')) newErrors.email = 'Email already exists';
        if (data.error.includes('Phone Number')) newErrors.phno = 'Phone Number already exists';
        setErrors(newErrors);
      } else {
        localStorage.setItem('AGRITRADE', data?.username);
        navigate('/');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container mt-2 bg-success p-3 rounded" style={{ maxWidth: "500px" }}>
      <h2>Register</h2>
      <form onSubmit={otpSent && otpVerified ? handleSubmit : (e) => e.preventDefault()}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label cursor-pointer">Full Name</label>
          <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} id="name" value={formData.name} onChange={handleInputChange} placeholder='Enter Your Full name' />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label cursor-pointer">Username</label>
          <input type="text" className={`form-control ${errors.username ? 'is-invalid' : ''}`} id="username" value={formData.username} onChange={handleInputChange} placeholder='Enter Your username' />
          {errors.username && <div className="invalid-feedback">{errors.username}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label cursor-pointer">*Email address</label>
          <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="email" value={formData.email} onChange={handleInputChange} placeholder='OTP Will be Sent to this email' />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label cursor-pointer">Password</label>
          <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="password" value={formData.password} onChange={handleInputChange} placeholder='Minimum 8 characters' />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label cursor-pointer">Confirm Password</label>
          <input type="text" className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} id="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder='Re Enter your password' />
          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="phno" className="form-label cursor-pointer">Phone Number</label>
          <input type="text" className={`form-control ${errors.phno ? 'is-invalid' : ''}`} id="phno" value={formData.phno} onChange={handleInputChange} placeholder='Enter Your Phone Number' />
          {errors.phno && <div className="invalid-feedback">{errors.phno}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="pic" className="form-label cursor-pointer">Profile Photo</label>
          <input type="file" className="form-control" id="pic" onChange={handleFile} />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Gender</label>
          <select id="gender" className={`form-control ${errors.gender ? 'is-invalid' : ''}`} value={formData.gender} onChange={handleInputChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="dob" className="form-label cursor-pointer">Date of birth</label>
          <input type="date" className={`form-control ${errors.dob ? 'is-invalid' : ''}`} id="dob" value={formData.dob} onChange={handleInputChange} />
          {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
        </div>

        {!otpSent && <button type="button" className="btn btn-warning my-3" onClick={handleSendOtp}>Send OTP</button>}
        {otpSent && !otpVerified && <Otp onSubmit={(otp) => setOtpVerified(otp === receivedOtp)} />}
      </form>
     <div>
       <Link to={`/login`} className='text-decoration-none md:fs-5 text-reset fw-medium my-5'>Already Have an Account? Login Now!</Link>
      </div>
      
      <Link to={`/seller/register`} className='text-decoration-none md:fs-5 text-reset fw-medium my-5'>Register As Seller</Link>
    </div>
  );
};

export default Register;