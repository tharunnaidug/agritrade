import React, { useEffect, useState } from 'react';
import AppContext from './AppContext';
import { toast, Bounce } from 'react-toastify';
import axios from 'axios';

axios.defaults.withCredentials = true;

const AppState = (props) => {
    // const url = "http://localhost:3000";
    const url = "https://agritradebackend.onrender.com";

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
                const atAdmin=localStorage.getItem("ATADMIN");
                if(atAdmin){
                    setIsAdmin(true);
                    await adminDashboard();
                }else{
                    setIsSeller(false);
                }
            } catch (error) {
                console.error('Error Getting Auth from Browser:', error);
            }
        }

        getAuth();
        if(isAuth){
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
    const placeOrder = async () => {
        try {
            let response = await axios.post(`${url}/user/placeorder`, {
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
                 formData , {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            console.log(formData);
            console.log(response);
            setUserReload(true);
            toast.info(response.data.message || "Address Added", {
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

    //Admin
    const adminLogin = async (formData) => {
         if(formData.username=="admin" &&formData.password=="admin"){
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

    return (
        <AppContext.Provider value={{ isAuth, login, register, logout, sellerLogout, sendOtp, sendSellerOtp, user, sellerRegister, sellerLogin, seller, addProduct, sellerAllProducts, sellerProduct, deleteProduct, updateProduct, products, addToCart, cart, clearCart, addQty, removeQty, getCart,adminLogin ,admin,isAdmin,adminLogout,updateAddress,placeOrder}}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState;
//loc =