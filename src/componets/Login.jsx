import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.password) newErrors.password = 'Password is required';
        return newErrors;
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        validateForm();
        console.log(formData);
    }
    const [errors, setErrors] = useState({});
   

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };
    return (
        <>
        <div className="container mt-3 bg-success p-4 rounded">
            <h2>Login</h2>
            <form className="mb-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
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
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        id="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <Link to="/register" className="text-decoration-none fs-5 text-dark fw-medium d-block mt-3">
                Don't Have an Account? Register Now!
            </Link>
        </div>
    </>
    
    )
}

export default Login