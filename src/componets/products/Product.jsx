import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RelatedProduct from './Relatedproduct.jsx';
import AppContext from '../../context/AppContext';
import { ShoppingCart } from 'lucide-react';

const Product = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const url = import.meta.env.VITE_API_URL;

    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [avgRating, setAvgRating] = useState(null);

    const { isAuth, addToCart } = useContext(AppContext);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await axios.get(`${url}/product/${id}`, {
                    headers: { "Content-Type": "Application/json" },
                    withCredentials: true,
                });
                console.log(response.data);
                setProduct(response.data.product);
                setReviews(response.data.reviews || []);
                setAvgRating(response.data.avgRating);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };
        getProduct();
    }, [id]);

    if (!product) {
        return (
            <div className="container mt-3 d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <span className='p-2'>Loading</span>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row align-items-center">
                <div className="col-md-6 text-center">
                    {product.imgSrc && product.imgSrc.length > 0 ? (
                        <div className="d-flex overflow-auto" style={{ maxWidth: "100%", padding: "10px 0" }}>
                            {product.imgSrc.map((img, index) => (
                                <img key={index} src={img} alt={`Product Image ${index + 1}`} className="img-fluid rounded shadow me-3" style={{ maxHeight: "300px", objectFit: "contain", width: "auto" }} />
                            ))}
                        </div>
                    ) : (
                        <div className="d-flex justify-content-center align-items-center border rounded" style={{ height: '300px', backgroundColor: '#f5f5f5' }}>
                            <span>No Image Available</span>
                        </div>
                    )}
                </div>

                <div className="col-md-6 d-flex flex-column">
                    <h2 className='fw-bold mt-3'>{product.title}</h2>
                    <p className='text-muted'>Seller Name: {product.seller.companyname || 'Unknown'}</p>
                    <p className='text-muted'>Category: {product.category || 'Uncategorized'}</p>
                    <p className='text-start' style={{ maxHeight: "35vh", overflowY: "auto" }}>{product.description}</p>
                    <h4 className='fw-bold text-success'>₹ {product.price}</h4>

                    <h6 className='mt-2'>
                        Average Rating:{" "}
                        {avgRating ? (
                            <span className="text-warning fw-bold">{avgRating} ⭐</span>
                        ) : (
                            <span className="text-muted">No ratings yet</span>
                        )}
                    </h6>

                    <div className="mt-3 d-flex">
                        <button className="btn btn-success px-4 fw-medium" onClick={() => {
                            if (isAuth) {
                                addToCart(product._id, product.title, product.price, 1, product.imgSrc[0]);
                            } else {
                                navigate('/login');
                            }
                        }}>Buy Now</button>
                        <button className="btn btn-warning ms-3 fw-medium d-flex align-items-center" onClick={() => {
                            if (isAuth) {
                                addToCart(product._id, product.title, product.price, 1, product.imgSrc[0]);
                            } else {
                                navigate('/login');
                            }
                        }}>
                            <ShoppingCart className="me-2" />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <h4 className="mb-3">Customer Reviews</h4>
                {reviews.length > 0 ? (
                    <div className="row">
                        {reviews.map((review, i) => (
                            <div className="col-md-6 mb-3" key={i}>
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <h6 className="card-title mb-1">
                                            {review.user?.name || "Anonymous"}
                                        </h6>
                                        <div className="text-warning mb-2">
                                            {'⭐'.repeat(review.rating)}{' '}
                                            <span className="text-muted ms-2">({review.rating})</span>
                                        </div>
                                        <p className="card-text">{review.comment}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted">No reviews yet. Be the first to review!</p>
                )}
            </div>

            <RelatedProduct category={product.category} />
        </div>
    );
};

export default Product;