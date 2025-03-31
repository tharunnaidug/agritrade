import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Otp from './Otp';
import AppContext from '../context/AppContext';

const Register = () => {
  const { register, sendOtp } = useContext(AppContext);
  const [otpSent, setOtpSent] = useState(false);
  const [receivedOtp, setReceivedOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState(""); 
  const [loading, setLoading] = useState(false);

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
    setLoading(true); 
    try {
      const data = await sendOtp(formData.email);
      setReceivedOtp(data.otp);
      setOtpSent(true);
      setLoading(true); 
    } catch (error) {
      console.error("Failed to send OTP", error.response?.data?.message);
      setOtpError(error.response?.data?.message||"Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
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
        navigate('/user/profile');
        setTimeout(() => {
          window.location.reload();
      }, 1000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container mt-2 bg-success p-3 rounded text-white" style={{ maxWidth: "500px" }}>
      <h2>Register</h2>
      <form onSubmit={otpSent && otpVerified ? handleSubmit : (e) => e.preventDefault()}>
        {["name", "username", "email", "password", "confirmPassword", "phno"].map((field, idx) => (
          <div className="mb-3" key={idx}>
            <label htmlFor={field} className="form-label">{field === "confirmPassword" ? "Confirm Password" : field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input type={field.includes("password") ? "password" : "text"} className={`form-control ${errors[field] ? 'is-invalid' : ''}`} id={field} value={formData[field]} onChange={handleInputChange} placeholder={`Enter your ${field}`} />
            {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
          </div>
        ))}
        <div className="mb-3">
          <label htmlFor="pic" className="form-label">Profile Photo</label>
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
          <label htmlFor="dob" className="form-label">Date of Birth</label>
          <input type="date" className={`form-control ${errors.dob ? 'is-invalid' : ''}`} id="dob" value={formData.dob} onChange={handleInputChange} />
          {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
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

      <div className="mt-3">
        <Link to={`/login`} className='text-decoration-none text-reset fw-medium'>Already Have an Account? Login Now!</Link>
      </div>
      <div className="mt-2">
        <Link to={`/seller/register`} className='text-decoration-none text-reset fw-medium'>Register As Seller</Link>
      </div>
    </div>
  );
};

export default Register;
