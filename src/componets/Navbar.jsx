import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, UserPlus } from 'lucide-react';
import AppContext from '../context/AppContext';

const Navbar = () => {
    const { isAuth, isSeller } = useContext(AppContext);

    return (
        <nav
            className="navbar navbar-expand-lg navbar-light shadow"
            style={{
                backgroundColor: "rgb(37, 223, 37)",
                borderRadius: "10px",
                position: "sticky",
                top: 0,
                zIndex: 1000,
            }}>
            <div className="container-fluid">
                <Link className="navbar-brand h-50" to="/">
                    <img src="/logo.jpg" alt="Logo" height="50px" />
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/auction">Auctions</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/aboutus">About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contactus">Contact Us</Link>
                        </li>
                    </ul>

                    <ul className="navbar-nav d-flex gap-2">

                        {!isSeller && (
                            <li className="nav-item">
                                <Link className="nav-link fw-semibold" to={isAuth ? "/user/profile" : "/login"}>
                                    <User /> {isAuth ? "Profile" : "Login"}
                                </Link>
                            </li>
                        )}

                        {isSeller && (
                            <Link className="nav-link fw-semibold" to={isSeller ? "/seller/profile" : "/login"}>
                                <User /> {isSeller ? "Profile" : "Login"}
                            </Link>
                        )}
                        {!isSeller && (
                            <li className="nav-item">
                                <Link className="nav-link fw-semibold" to="/seller/register">
                                    <UserPlus /> Become a Seller
                                </Link>
                            </li>
                        )}

                        {!isSeller && (
                            <li className="nav-item">
                                <Link className="nav-link fw-semibold" to="/user/cart">
                                    <ShoppingCart /> Cart
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
