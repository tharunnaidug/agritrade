import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';

const Payment = () => {
    const { placeOrder } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handlePayment = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        
        try {
            await placeOrder();
            setSuccess(true);
        } catch (err) {
            setError(err.message || "Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4 text-center">
            <h2>Payment</h2>
            <p>Currently COD Avilable</p>
            {loading && <p className="text-primary">Processing your order...</p>}
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">Order placed successfully!</p>}
            
            {!success && !loading && (
                <button onClick={handlePayment} className="btn btn-primary mt-3">Place Order</button>
            )}
            
            {error && !loading && (
                <button onClick={handlePayment} className="btn btn-warning mt-3">Retry</button>
            )}

            {success && (
                <Link to="/" className="btn btn-success mt-3">Go to Home</Link>
            )}
        </div>
    );
};

export default Payment;
