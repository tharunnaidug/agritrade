import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';

const Login = () => {
    const { login } = useContext(AppContext);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };


    const validateForm = () => {
        const newErrors = {};
        if (!formData.username.trim()) newErrors.username = 'Username is required';
        if (!formData.password.trim()) newErrors.password = 'Password is required';
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
            const data = await login(formData);
            console.log("Login response:", data);

            if (data?.error) {
                const newErrors = {};
                if (data.error.includes('No user found')) newErrors.username = 'No user found';
                if (data.error.includes('Incorrect Password')) newErrors.password = 'Invalid password';
                setErrors(newErrors);
            } else {
                localStorage.setItem('AGRITRADE', data?.username);
                navigate('/');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="container mt-3 bg-success p-4 rounded" style={{ maxWidth: '500px' }}>
            <h2 className="mb-4 text-white">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label text-white">Username</label>
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
                    <label htmlFor="password" className="form-label text-white">Password</label>
                    <input
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        id="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>

            <Link to="/register" className="text-decoration-none d-block mt-3 text-center text-white fw-bold">
                Don't Have an Account? Register Now!
            </Link>
        </div>
    );
};

export default Login;