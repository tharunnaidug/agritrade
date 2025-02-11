import React from 'react'

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light " style={{ backgroundColor: "rgb(37, 223, 37)", borderRadius: "10px" }}>
                <div className="container-fluid">
                    <a className="navbar-brand h-50" href="#"><img src="/logo.jpg" alt="" height={"50px"} /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/products">Products</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/auction">Auctions</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/aboutus">AboutUs</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/contactus">ContactUs</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar