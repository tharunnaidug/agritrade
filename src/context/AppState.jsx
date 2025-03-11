import React, { useState } from 'react';
import AppContext from './AppContext';
import { toast, Bounce } from 'react-toastify';
import axios from 'axios';

axios.defaults.withCredentials = true;

const AppState = (props) => {
    const url = "http://localhost:3000";

    const [isAuth, setIsAuth] = useState(false);


    const login = async (formData) => {
        try {
            const { data } = await axios.post(`${url}/login`, formData, {
                headers: { 'Content-Type': 'application/json' },
            });

            setIsAuth(true);
            toast.success("Welcome Back!", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });

            return data;
        } catch (error) {
            toast.error(error.response?.data?.error || "Login Failed!", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            throw error;
        }
    };

    const register = async (formData) => {
        try {
            const { data } = await axios.post(`${url}/register`, formData, {
                headers: { 'Content-Type': 'application/json' },
            });

            setIsAuth(true);
            toast.success("Welcome! ", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });

            return data;
        } catch (error) {
            toast.error(error.response?.data?.error ||"Registration Failed!", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            throw error;
        }
    };
    const logout = async () => {
        setIsAuth(false);
        const response = await axios.get(`${url}/logout`, {
            headers: { 'Content-Type': 'application/json' },
        });
        localStorage.removeItem("AGRITRADE");
        return response.json();
    };
    const sendOtp = async (email) => {
        try {
            const { data } = await axios.post(`${url}/user/genarateOtp`, { email }, {
                headers: { 'Content-Type': 'application/json' },
            });
    
            toast.success("OTP Sent to Email!", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
    
            return data; 
        } catch (error) {
            toast.error("Failed to send OTP!", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            throw error;
        }
    };
    const sendSellerOtp = async (email) => {
        try {
            const { data } = await axios.post(`${url}/user/genarateOtp`, { email }, {
                headers: { 'Content-Type': 'application/json' },
            });
    
            toast.success("OTP Sent to Email!", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
    
            return data; 
        } catch (error) {
            toast.error("Failed to send OTP!", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            throw error;
        }
    };
    


    return (
        <AppContext.Provider value={{ isAuth, login, register, logout,sendOtp,sendSellerOtp }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState;