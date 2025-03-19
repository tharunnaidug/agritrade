import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../context/AppContext';
import { Link } from 'react-router-dom';

const RelatedProduct = ({ category }) => {
    const { products } = useContext(AppContext);
    const [relatedProduct, setRelatedProduct] = useState([]);

    useEffect(() => {
        if (products?.length > 0 && category) {
            setRelatedProduct(
                products.filter((data) => data?.category?.toLowerCase() === category?.toLowerCase())
            );
        }
    }, [category, products]);

    return (
        <div className="container text-center mt-4">
            <h2 className="fw-bold mb-3">Related Products</h2>
            <div className="row">
                {relatedProduct.length > 0 ? (
                    relatedProduct.map((product) => (
                        <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                            <div className="card h-100 shadow-sm">
                                <Link to={`/product/${product._id}`} className="text-decoration-none">
                                    {product.imgSrc[0] && product?.imgSrc?.length > 0 ? (
                                        <img src={product.imgSrc} className="card-img-top fw-bolder p-3" alt={product.title} style={{ height: '200px', objectFit: 'cover', width: '100%' }} />
                                    ) : (
                                        <div className="no-images d-flex justify-content-center align-items-center" style={{ height: '200px', backgroundColor: '#f5f5f5' }}>
                                            <span>No Image Available</span>
                                        </div>
                                    )}
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title text-dark">{product.title}</h5>
                                        <p className="card-text text-muted text-truncate">{product.description}</p>
                                        <span className="btn btn-primary mt-auto">₹ {product.price}</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-muted">No related products found.</p>
                )}
            </div>
        </div>
    );
};

export default RelatedProduct;
