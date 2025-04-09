import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';

const Sresetpassword = () => {
    const [params] = useSearchParams();
    const token = params.get("token");
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
  
    const handleReset = async (e) => {
      e.preventDefault();
      if (newPassword.length < 8) {
          toast.error("Password must be at least 8 characters long");
          return;
        }  
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/seller/resetpassword`, {
          token,
          newPassword
        });
        toast.success("Password reset successfully!");
        navigate('/');
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to reset password");
      }
    };
  
    return (
      <div className="container mt-5" style={{ maxWidth: "500px" }}>
        <h2 className="mb-4">Reset Your Password</h2>
        <form onSubmit={handleReset}>
          <div className="mb-3 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="New password (min 8 chars)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                cursor: "pointer"
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
          <button className="btn btn-primary" type="submit">
            Reset Password
          </button>
        </form>
        <Link to="/" className='m-2 btn btn-warning'>Home</Link>
      </div>
    );
}

export default Sresetpassword