import React, { useEffect, useState } from 'react';
import AppContext from './AppContext';
import { toast, Bounce } from 'react-toastify';
import axios from 'axios';

axios.defaults.withCredentials = true;

const AppState = (props) => {
    const url = import.meta.env.VITE_API_URL;

    const [isAuth, setIsAuth] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState(null);
    const [seller, setSeller] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [userReload, setUserReload] = useState(false)
    const [reload, setReload] = useState(false)
    const [products, setProducts] = useState(null)
    const [filteredData, setFilteredData] = useState(null)
    const [cart, setCart] = useState(null);


    useEffect(() => {
        const getAuth = async () => {
            try {
                const username = localStorage.getItem("AGRITRADE");
                if (username) {
                    setIsAuth(true);
                    await userProfile(username);
                } else {
                    setIsAuth(false);
                }
                const atSeller = localStorage.getItem("ATSELLER");
                if (atSeller) {
                    setIsSeller(true);
                    await sellerProfile(atSeller);
                } else {
                    setIsSeller(false);
                }
                const atAdmin = localStorage.getItem("ATADMIN");
                if (atAdmin) {
                    setIsAdmin(true);
                    await adminDashboard();
                } else {
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error('Error Getting Auth from Browser:', error);
            }
        }

        getAuth();
        if (isAuth) {
            getCart();
        }
        setUserReload(false);

    }, [userReload, isAuth, isSeller])

    useEffect(() => {
        const getProducts = async () => {
            try {
                let response = await axios.get(`${url}/product`, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
                console.log(response.data.product);
                setProducts(response.data.product);
                setFilteredData(response.data.product);

            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        getProducts();
        setReload(false);

    }, [reload])


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
        toast.success(response?.data?.message, {
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
        return response;
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
    const addToCart = async (productId, title, price, qty, imgScr) => {
        // console.log("frontend ",imgScr)
        try {
            let response = await axios.post(`${url}/user/cart/add`,
                { productId, title, price, qty, imgScr }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            // console.log("myCart", response.data.message);
            setReload(!reload);
            toast.info(response.data.message, {
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

        } catch (error) {
            console.error('Error Adding To Cart:', error);
            toast.info(response.data.message || "Internal Server Error", {
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
        }
    };
    const getCart = async () => {
        try {
            let response = await axios.get(`${url}/user/cart/`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            setCart(response.data.cart);
            // console.log(response.data.cart);
        } catch (error) {
            console.error('Error fetching Cart:', error);
        }
    };
    const clearCart = async () => {
        try {
            let response = await axios.get(`${url}/user/cart/clear`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            console.log(response.data);
            setUserReload(true);
            toast.info(response.data.message, {
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
        } catch (error) {
            console.error('Error Clearing Cart:', error);
        }
    };
    const removeQty = async (productId) => {
        // console.log("frontend ",imgScr)
        try {
            let response = await axios.post(`${url}/user/cart/removeQty`,
                { productId }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            setUserReload(true);
            toast.info(response.data.message || "Quantity Decreased", {
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

        } catch (error) {
            console.error('Error Removing Qty to cart:', error);
            toast.info(response.data.message || "Internal Server Error", {
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
        }
    };
    const addQty = async (productId) => {
        try {
            let response = await axios.post(`${url}/user/cart/addQty`,
                { productId }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            setUserReload(true);
            toast.info(response.data.message || "Quantity Added", {
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

        } catch (error) {
            console.error('Error Adding Qty to cart:', error);
            toast.info(response.data.message || "Internal Server Error", {
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
        }
    };
    const placeOrder = async (payment) => {
        try {
            let response = await axios.post(`${url}/user/placeorder`, { payment }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            console.log(response);
            setUserReload(true);
            toast.info(response?.data?.message || "Order Placed", {
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

        } catch (error) {
            console.error('Error Placing Order:', error);
            toast.info(response?.data?.message || "Internal Server Error", {
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
        }
    };
    const updateAddress = async (formData) => {
        try {
            let response = await axios.post(`${url}/user/address/update`,
                formData, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            // console.log(formData);
            // console.log(response);
            setUserReload(true);
            toast.info(response?.data.message || "Address Added", {
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

        } catch (error) {
            console.error('Error Adding Address:', error);
            toast.info("Address Update Failed", {
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
        }
    };
    const userOrder = async (id) => {
        try {
            let response = await axios.get(`${url}/user/order/${id}`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            // console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching Seller Order ', error);
        }
    };
    const cancelOrder = async (id) => {
        try {
            let response = await axios.put(`${url}/user/order/cancel/${id}`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            console.log(response)
            return response;
        } catch (error) {
            console.error('Error cancelling order:', error);
        }
    };
    const UpdateUserPro = async (formData) => {
        try {
            let response = await axios.post(`${url}/user/profile/update`,
                formData, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
                // console.log(formData);
                // console.log(response);
                setUserReload(true);
                toast.info(response.data.message || "Address Updated", {
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

        } catch (error) {
            console.error('Error Updating Address:', error);
            toast.info(response?.data.message || "Internal Server Error", {
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
            
            setIsSeller(true);
            
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
            setUserReload(true);
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
            
            setIsSeller(true);
            
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
            setUserReload(true);
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
    const sellerLogout = async () => {
        setIsSeller(false);
        const response = await axios.get(`${url}/logout`, {
            headers: { 'Content-Type': 'application/json' },
        });
        localStorage.removeItem("ATSELLER");
        toast.success(response?.data?.message, {
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
        
        return response
    };
    const addProduct = async (formData) => {
        try {
            const { data } = await axios.post(`${url}/seller/addproduct`, formData, {
                headers: { 'Content-Type': 'application/json' },
            });
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
    const updateOrder = async (id, status) => {
        try {
            const { data } = await axios.post(`${url}/seller/updateorder/${id}`, status, {
                headers: { 'Content-Type': 'application/json' },
            });
            
            return data;
        } catch (error) {
            throw error;
        }
    };
    const updateProduct = async (formData, id) => {
        try {
            const { data } = await axios.post(`${url}/seller/updateproduct/${id}`, formData, {
                headers: { 'Content-Type': 'application/json' },
            });
            
            return data;
        } catch (error) {
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
            setSeller(response.data)
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
            // console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching Seller All Products ', error);
        }
    };
    const sellerProduct = async (id) => {
        try {
            let response = await axios.get(`${url}/seller/product/${id}`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            // console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching Seller Product', error);
        }
    };
    const deleteProduct = async (id) => {
        try {
            let response = await axios.get(`${url}/seller/deleteproduct/${id}`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching Seller Product', error);
        }
    };
    const sellerOrder = async (id) => {
        try {
            let response = await axios.get(`${url}/seller/order/${id}`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            // console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching Seller Order ', error);
        }
    };
    const sellerAllOrders = async () => {
        try {
            let response = await axios.get(`${url}/seller/orders`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            // console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching Seller Orders ', error);
        }
    };
    
    //Admin
    const adminLogin = async (formData) => {
        if (formData.username == "admin" && formData.password == "admin") {
            console.log(formData)
            
            setIsAuth(true);
            toast.success("Welcome Admin !", {
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
            
            return formData;
        } else {
            toast.error("Incorrect Admin ID Password", {
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
    const adminDashboard = async () => {
        try {
            let response = await axios.get(`${url}/admin/dashboard`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            // console.log(response.data);
            setAdmin(response.data)
            return (response.data);
        } catch (error) {
            console.error('Error fetching Admin Dashboard :', error);
        }
    };
    const adminLogout = async () => {
        setIsAdmin(false);
        // const response = await axios.get(`${url}/logout`, {
            //     headers: { 'Content-Type': 'application/json' },
            // });
        localStorage.removeItem("ATADMIN");
        toast.success("Logged Out !", {
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

        // return true;
    };
    const adminAllUsers = async () => {
        try {
            let response = await axios.get(`${url}/admin/users`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            // console.log(response.data);
            // setAdmin(response.data)
            return response.data;
        } catch (error) {
            console.error('Error fetching Admin All USers :', error);
        }
    };
    const adminAllOrders = async () => {
        try {
            let response = await axios.get(`${url}/admin/orders`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            console.log(response);
            return response;
        } catch (error) {
            console.error('Error fetching Admin Allorders :', error);
        }
    };
    const adminAllProducts = async () => {
        try {
            let response = await axios.get(`${url}/admin/products`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.error('Error fetching Admin All products :', error);
        }
    };
    const adminAllAuctions = async () => {
        try {
            let response = await axios.get(`${url}/auction/admin/allAuctions`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.error('Error fetching Admin All products :', error);
        }
    };
    const adminAllSellers = async () => {
        try {
            let response = await axios.get(`${url}/admin/sellers`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            // console.log(response.data);
            // setAdmin(response.data)
            return (response.data);
        } catch (error) {
            console.error('Error fetching Admin All Sellers :', error);
        }
    };
    const adminUpdateProduct = async (id, formData) => {
        try {
            const { data } = await axios.post(`${url}/admin/updateproduct/${id}`, formData, {
                headers: { 'Content-Type': 'application/json' },
            });
            toast.success("Updated !", {
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
            toast.error("Internal Server Error!", {
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
    const adminUpdateOrder = async (id, status) => {
        try {
            const { data } = await axios.post(`${url}/admin/updateorder/${id}`, status, {
                headers: { 'Content-Type': 'application/json' },
            });

            return data;
        } catch (error) {
            throw error;
        }
    };
    const adminUpdateAuction = async (id, formData) => {
        console.log(formData);
        try {
            const { data } = await axios.post(`${url}/auction/admin/updateauction`, formData, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log(data);
            return data;
        } catch (error) {
            throw error;
        }
    };
    
    
    //Auctions
    
    const listedAuctions = async () => {
        try {
            let response = await axios.get(`${url}/auction/allMyListedAuctions`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching Listed Auctions of user ', error);
        }
    };
    const myAuctions = async () => {
        try {
            let response = await axios.get(`${url}/auction//allMyAuctions`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching Auctions of user ', error);
        }
    };
               //Featured Auctions
    const upcomingAuctions = async () => {
        try {
            let response = await axios.get(`${url}/auction/upcomingAuctions`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            // console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching upcoming Auctions ', error);
        }
    };
    const liveAuctions = async () => {
        try {
            let response = await axios.get(`${url}/auction/liveAuctions`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            // console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching upcoming Auctions ', error);
        }
    };
    const viewAuctionInfo = async (id) => {
        try {
            let response = await axios.get(`${url}/auction/auction/${id}`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            // console.log(response);
            return response.data;
        } catch (error) {
            console.error('Error fetching Auction Info ', error);
        }
    };
    const addAuction = async (formData) => {
        try {
            const { data } = await axios.post(`${url}/auction/addauction`, formData, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log(data)
            return data;
        } catch (error) {
            throw error;
        }
    };
    const interested = async (auctionId) => {
        try {
            const { data } = await axios.post(`${url}/auction/interested`, {auctionId}, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log(data)
            return data;
        } catch (error) {
            throw error;
        }
    };

    return (
        <AppContext.Provider value={{ isAuth, login, register, logout, sellerLogout, sendOtp, sendSellerOtp, user, sellerRegister, sellerLogin, seller, addProduct, sellerAllProducts, sellerProduct, deleteProduct, updateProduct, products, addToCart, cart, clearCart, addQty, removeQty, getCart, adminLogin, admin, isAdmin, adminLogout, updateAddress, placeOrder, sellerAllOrders, sellerOrder, updateOrder, userOrder, cancelOrder, setUserReload, UpdateUserPro, adminAllOrders, adminAllProducts, adminAllSellers, adminAllUsers, adminUpdateOrder, adminUpdateProduct, isSeller,addAuction,listedAuctions,upcomingAuctions,viewAuctionInfo,interested,liveAuctions,myAuctions ,adminAllAuctions,adminUpdateAuction}}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState;
//loc =