import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AppContext from '../../context/AppContext';
import { Banknote, CreditCard, TriangleAlert } from 'lucide-react';

const Payment = () => {
    const { placeOrder, user, cart, isAuth } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("COD");

    const API_URL = import.meta.env.VITE_API_URL;
    const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY;


    useEffect(() => {

        if (!isAuth) {
            return (
                <>
                    <TriangleAlert className='mt-5' />
                    <div className="text-center ">Looks like you are not Logged in ..!</div>
                    <Link to='/login' className='btn btn-success mt-4'>Login Now</Link>
                </>
            )
        }
        if (!cart || cart.items?.length == 0) {
            return (
                <>
                    <TriangleAlert className='mt-5' />
                    <div className="text-center ">Looks like your cart is empty ..!</div>
                    <Link to='/user/cart' className='btn btn-success mt-4'>Cart</Link>
                </>
            )
        }
        
    }, [])

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleCODPayment = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            await placeOrder("COD");
            setSuccess(true);
        } catch (err) {
            console.log(err)
            setError(err.message || "Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleRazorpayPayment = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
            setError("Failed to load Razorpay. Check your internet connection.");
            setLoading(false);
            return;
        }

        try {
            const totalAmount = cart?.items?.reduce((sum, item) => sum + item.price * item.qty, 0);
            const { data } = await axios.post(`${API_URL}/payment/checkout`, {
                amount: totalAmount,
            }, { withCredentials: true });

            const options = {
                key: RAZORPAY_KEY,
                amount: data.amount * 100,
                currency: "INR",
                name: "AgriTrade",
                description: "Order Payment",
                order_id: data.orderId,
                handler: async function (response) {
                    await axios.post(`${API_URL}/payment/verifyPayment`, {
                        orderId: data.orderId,
                        paymentId: response.razorpay_payment_id,
                        signature: response.razorpay_signature,
                    }, { withCredentials: true });
                    await placeOrder("PAID");
                    setSuccess(true);
                },
                prefill: {
                    name: user?.address?.fullname || "",
                    email: user?.email || "",
                    contact: user?.address?.phno || "",
                },
                theme: {
                    color: "#3399cc",
                },
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            setError("Failed to initiate payment. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4 text-center">
            <h2>Payment</h2>
            <p>Select Payment Method</p>
            <div>
                <label>
                    <Banknote />
                    <input type="radio" value="COD" checked={paymentMethod === "COD"} onChange={() => setPaymentMethod("COD")} /> COD
                </label>
                <label className="ms-3">
                    <CreditCard />
                    <input type="radio" value="Razorpay" checked={paymentMethod === "Razorpay"} onChange={() => setPaymentMethod("Razorpay")} /> Razorpay
                </label>
            </div>

            {loading && <p className="text-primary">Processing your order...</p>}
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">Order placed successfully!</p>}

            {!success && !loading && (
                <button onClick={paymentMethod === "COD" ? handleCODPayment : handleRazorpayPayment} className="btn btn-primary mt-3">
                    {paymentMethod === "COD" ? "Place Order (COD)" : "Pay with Razorpay"}
                </button>
            )}

            {error && !loading && (
                <button onClick={paymentMethod === "COD" ? handleCODPayment : handleRazorpayPayment} className="btn btn-warning mt-3">Retry</button>
            )}

            {success && (<>
                <Link to="/" className="btn btn-warning mt-3">Go to Home</Link>
                <Link to="/user/allorders" className="btn btn-success mt-3">All Orders</Link>
            </>
            )}
        </div>
    );
};

export default Payment;