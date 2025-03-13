import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Otp from '../Otp';
import AppContext from '../../context/AppContext';

const Sregister = () => {
  const { sellerRegister, sendSellerOtp } = useContext(AppContext);
  const [otpSent, setOtpSent] = useState(false);
  const [receivedOtp, setReceivedOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState(""); 
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phno: ''
  });

  const [errors, setErrors] = useState({});

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
    setLoading(true); 
    try {
      const data = await sendSellerOtp(formData.email);
      setReceivedOtp(data.otp);
      setOtpSent(true);
      setLoading(true); 
    } catch (error) {
      console.error("Failed to send OTP", error);
      setOtpError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.companyname) newErrors.companyname = 'Company name is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password && formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.phno) newErrors.phno = 'Phone Number is required';
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
      const data = await sellerRegister(formData);
      console.log(data);
      if (data?.error) {
        const newErrors = {};
        if (data.error.includes('Username')) newErrors.username = 'Username already exists';
        if (data.error.includes('Email')) newErrors.email = 'Email already exists';
        if (data.error.includes('Phone Number')) newErrors.phno = 'Phone Number already exists';
        setErrors(newErrors);
      } else {
        localStorage.setItem('ATSELLER', data?.username);
        navigate('/seller');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container mt-2 bg-success p-3 rounded" style={{ maxWidth: "500px" }}>
      <h2 className='text-white'>Seller Register</h2>
      <form onSubmit={otpSent && otpVerified ? handleSubmit : (e) => e.preventDefault()}>
        <div className="mb-3">
          <label htmlFor="companyname" className="form-label cursor-pointer text-white">Company Name</label>
          <input
            type="text"
            className={`form-control ${errors.companyname ? 'is-invalid' : ''}`}
            id="companyname"
            value={formData.companyname}
            onChange={handleInputChange}
            placeholder="Enter your Company name"
          />
          {errors.companyname && <div className="invalid-feedback">{errors.companyname}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="username" className="form-label cursor-pointer text-white">UserName</label>
          <input
            type="text"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            id="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Choose a Username"
          />
          {errors.username && <div className="invalid-feedback">{errors.username}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label cursor-pointer text-white">*Email address</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="OTP will be sent to this email"
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label cursor-pointer text-white">Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Minimum 8 characters"
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label cursor-pointer text-white">Confirm Password</label>
          <input
            type="password"
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Re-enter your password"
          />
          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="phno" className="form-label cursor-pointer text-white">Phone Number</label>
          <input
            type="text"
            className={`form-control ${errors.phno ? 'is-invalid' : ''}`}
            id="phno"
            value={formData.phno}
            onChange={handleInputChange}
            placeholder="Enter Your Phone Number"
          />
          {errors.phno && <div className="invalid-feedback">{errors.phno}</div>}
        </div>

        {!otpSent && (
          <button type="button" className="btn btn-warning my-3" onClick={handleSendOtp} disabled={loading}>
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        )}
        {otpError && <p className='text-danger'>{otpError}</p>}
        {otpSent && !otpVerified && (
          <Otp onSubmit={(otp) => {
            if (otp === receivedOtp) {
              setOtpVerified(true);
              setOtpError("");
            } else {
              setOtpError("Invalid OTP. Please try again.");
            }
          }} />
        )}
        {otpError && <p className='text-danger'>{otpError}</p>}

        {otpVerified && <button type="submit" className="btn btn-primary mt-3">Register</button>}

      </form>

      <div className="mt-3 text-white">
        <Link to={`/seller/login`} className=" text-decoration-none md:fs-5 text-reset fw-medium">
          Already a Seller? Login Now!
        </Link>
      </div>

      <div className="mt-2 text-white">
        <Link to={`/register`} className="text-decoration-none md:fs-5 text-reset fw-medium text-white">
          Register as User
        </Link>
      </div>
    </div>
  );
};

export default Sregister;