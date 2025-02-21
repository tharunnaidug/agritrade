import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Otp from '../Otp';
// import AppContext from '../../context/AppContext';


const Sregister = () => {
  // const {register}= useContext(AppContext)
  const [formData, setFormData] = useState({
    companyname: '',
    username: '',
    email: '',
    password: '',
    phno: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.companyname) newErrors.companyname = 'companyname is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
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
      const data = await register(formData)
      console.log(data)
      localStorage.setItem('Agritrade',data?.username)

      if (data?.error) {
        const newErrors = {};
        if (data?.error?.includes('Username')) newErrors.username = 'Username already exists';
        if (data?.error?.includes('Email')) newErrors.email = 'Email already exists';
        if (data?.error?.includes('Phone Number')) newErrors.phno = 'Phone Number already exists';
        setErrors(newErrors);
      } else {
        navigate('/');
        console.log("registered")
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container mt-2 bg-success p-3 rounded "style={{maxWidth:"500px"}}>
      <h2>Seller Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label cursor-pointer">Company Name</label>
          <input
            type="text"
            className={`form-control ${errors.companyname ? 'is-invalid' : ''}`}
            id="name"
            value={formData.companyname}
            onChange={handleInputChange}
          />
          {errors.fullname && <div className="invalid-feedback">{errors.companyname}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label cursor-pointer">UserName</label>
          <input
            type="text"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            id="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          {errors.username && <div className="invalid-feedback">{errors.username}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label cursor-pointer">*Email address</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label cursor-pointer">Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            id="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
      <Otp/>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      <Link to={`/seller/login`} className='text-decoration-none md:fs-5 text-reset fw-medium my-5'>Already Seller? Login Now!</Link>
    </div>
  );
};

export default Sregister;