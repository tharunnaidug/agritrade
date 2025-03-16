import React from 'react';
import { ShoppingCart, User, UserPlus } from 'lucide-react';


const Navbar = () => {
    return (
        <>
            <nav
                className="navbar navbar-expand-lg navbar-light shadow"
                style={{
                    backgroundColor: "rgb(37, 223, 37)", borderRadius: "10px", position: "sticky", top: 0, zIndex: 1000
                }}>
                <div className="container-fluid">
                    <a className="navbar-brand h-50" href="/">
                        <img src="/logo.jpg" alt="Logo" height={"50px"} />
                    </a>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation" >
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/products">Products</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/auction">Auctions</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/aboutus">About Us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/contactus">Contact Us</a>
                            </li>
                        </ul>

                        <ul className="navbar-nav d-flex gap-2">
                            <li className="nav-item">
                                <a className="nav-link fw-semibold" href="/login">
                                    <User /> Login
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fw-semibold" href="/seller/register">
                                    <UserPlus />  Become a Seller
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fw-semibold" href="/user/cart">
                                    <ShoppingCart />  Cart
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
