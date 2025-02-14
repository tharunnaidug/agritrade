import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import AppContext from '../../context/AppContext';


const Register = () => {
  // const {register}= useContext(AppContext)
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    phno: '',
    dob: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Full Name is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.phno) newErrors.phno = 'Phone Number is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
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
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label cursor-pointer">Full Name</label>
          <input
            type="text"
            className={`form-control ${errors.fullname ? 'is-invalid' : ''}`}
            id="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.fullname && <div className="invalid-feedback">{errors.fullname}</div>}
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
        <div className="mb-3">
          <label htmlFor="phno" className="form-label cursor-pointer">Phone Number</label>
          <input
            type="text"
            className={`form-control ${errors.phno ? 'is-invalid' : ''}`}
            id="phno"
            value={formData.phno}
            onChange={handleInputChange}
          />
          {errors.phno && <div className="invalid-feedback">{errors.phno}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="dob" className="form-label cursor-pointer">Date of birth</label>
          <input
            type="date"
            className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
            id="dob"
            value={formData.dob}
            onChange={handleInputChange}
          />
          {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
        <div className='my-1'>*OTP will be sent to Email</div>
      <Link to={`/login`} className='text-decoration-none md:fs-5 text-reset fw-medium my-5'>Already Have an Account? Login Now!</Link>
    </div>
  );
};

export default Register;