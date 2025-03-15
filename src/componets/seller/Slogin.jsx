import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { Eye, EyeOff } from 'lucide-react'; 

const Slogin = () => {
    const { sellerLogin } = useContext(AppContext);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false); 
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.password) newErrors.password = 'Password is required';
        setErrors(newErrors); 
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) return;

        try {
            const data = await sellerLogin(formData);
            console.log("Login response:", data);

            if (data?.error) {
                const newErrors = {};
                if (data.error.includes('No user found')) newErrors.username = 'No user found';
                if (data.error.includes('Incorrect Password')) newErrors.password = 'Invalid password';
                setErrors(newErrors);
            } else {
                localStorage.setItem('ATSELLER', data?.username);
                navigate('/seller');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
        setErrors((prev) => ({ ...prev, [id]: '' }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <>
            <div className="container mt-3 bg-success p-4 rounded" style={{ maxWidth: "500px" }}>
                <h2 className='text-white'>Seller Login</h2>
                <form className="mb-4" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label text-white">Username</label>
                        <input
                            type="text"
                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                            id="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder='Enter Your username'
                        />
                        {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                    </div>

                    <div className="mb-3 position-relative">
                        <label htmlFor="password" className="form-label text-white">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            id="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder='Enter Your Password'
                        />
                        <span
                            onClick={togglePasswordVisibility}
                            style={{ position: 'absolute', right: '10px', top: '38px', cursor: 'pointer' }}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </span>
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        <div className="mt-2">
                            <Link to="/seller/forgotpassword" className="text-decoration-none text-dark">
                                Forgot Password?
                            </Link>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">Login</button>
                </form>

                <Link to="/seller/register" className="text-decoration-none fs-10 text-white fw-medium d-block mt-3">
                    Don't Have an Account? Register Now!
                </Link>
            </div>
        </>
    );
};

export default Slogin;
