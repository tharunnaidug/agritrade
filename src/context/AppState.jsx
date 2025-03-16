import React, { useEffect, useState } from 'react';
import AppContext from './AppContext';
import { toast, Bounce } from 'react-toastify';
import axios from 'axios';

axios.defaults.withCredentials = true;

const AppState = (props) => {
    // const url = "http://localhost:3000";
    const url = "https://agritradebackend.onrender.com";

    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [seller, setSeller] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                // let response = await axios.get(`${url}/product`, {
                //   headers: { "Content-Type": "application/json" },
                //   withCredentials: true,
                // });
                // // console.log(response.data.product);
                // setProducts(response.data.product);
                // setFilteredData(response.data.product);

                const username = localStorage.getItem("AGRITRADE");
                if (username) {
                    setIsAuth(true);
                    await userProfile(username);
                } else {
                    setIsAuth(false);
                }
                const atSeller = localStorage.getItem("ATSELLER");
                if (atSeller) {
                    setIsAuth(true);
                    await sellerProfile(atSeller);
                } else {
                    setIsAuth(false);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        getProducts();

    }, [])


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
            toast.error(error.response?.data?.error || "Registration Failed!", {
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
            toast.error(error.response?.data?.error || "Failed to send OTP!", {
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

    const userProfile = async (username) => {
        try {
            let response = await axios.get(`${url}/user/profile/${username}`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            // console.log(response.data);
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    //Sellers
    const sendSellerOtp = async (email) => {
        try {
            const { data } = await axios.post(`${url}/seller/genarateOtp`, { email }, {
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
            toast.error(error.response?.data?.message || "Failed to send OTP!", {
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
    const sellerLogin = async (formData) => {
        try {
            const { data } = await axios.post(`${url}/seller/login`, formData, {
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

    const sellerRegister = async (formData) => {
        try {
            const { data } = await axios.post(`${url}/seller/register`, formData, {
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
            toast.error(error.response?.data?.error || "Registration Failed!", {
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
    const addProduct = async (formData) => {
        try {
            const { data } = await axios.post(`${url}/seller/addproduct`, formData, {
                headers: { 'Content-Type': 'application/json' },
            });

            setIsAuth(true);
            toast.success("Product Added ", {
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
            toast.error(error.response?.data?.error || "Product Add Failed!", {
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
    const sellerProfile = async (username) => {
        try {
            let response = await axios.get(`${url}/seller/profile/${username}`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            // console.log(response.data);
            return (response.data);
        } catch (error) {
            console.error('Error fetching Seller profile:', error);
        }
    };
    const sellerAllProducts = async () => {
        try {
            let response = await axios.get(`${url}/seller/products`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching Seller profile:', error);
        }
    };


    return (
        <AppContext.Provider value={{ isAuth, login, register, logout, sendOtp, sendSellerOtp, user, sellerRegister, sellerLogin, seller, addProduct, sellerAllProducts }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState;