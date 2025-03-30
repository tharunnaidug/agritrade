import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import { TriangleAlert, Users, ShoppingBag, Box, Gavel, Clock, PackageCheck, Truck, CheckCircle, Hourglass, Ban, Handshake } from 'lucide-react';

const Admin = () => {
    const { admin, isAdmin, adminLogout } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
       
        if (admin) {
            setLoading(false);
        }
    }, [admin]);
    const handleLogout = async () => {
        await adminLogout();
        navigate('/admin/login');
    };
    if (!isAdmin) {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center vh-80">
                <TriangleAlert size={60} className="text-danger mb-3" />
                <h4 className="text-danger">Access Denied</h4>
                <p className="text-muted">Looks like you are not logged in ..!</p>
                <Link to='/admin/login' className='btn btn-success mt-3'>Login Now</Link>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }


    return (
        <div className="container mt-4">
            <h2 className="text-center fw-bold mb-4">Admin Dashboard</h2>

            <div className="row g-3">
                <DashboardCard title="Total Users" value={admin.dashboard.totalUsers} icon={<Users size={32} />} bgColor="primary" />
                <DashboardCard title="Total Sellers" value={admin.dashboard.totalSellers} icon={<ShoppingBag size={32} />} bgColor="success" />
                <DashboardCard title="Total Products" value={admin.dashboard.totalProducts} icon={<Box size={32} />} bgColor="warning" />
                <DashboardCard title="Total Auctions" value={admin.dashboard.totalAuctions} icon={<Gavel size={32} />} bgColor="info" />
                <DashboardCard title="Pending Auctions" value={admin.dashboard.pendingAuctions} icon={<Clock size={32} />} bgColor="danger" />
                <DashboardCard title="Total Orders" value={admin.dashboard.totalOrders} icon={<Handshake size={32} />} bgColor="primary" />
                <DashboardCard title="Pending Orders" value={admin.dashboard.pendingOrders} icon={<Hourglass size={32} />} bgColor="warning" />
                <DashboardCard title="Confirmed Orders" value={admin.dashboard.confirmedOrders} icon={<CheckCircle size={32} />} bgColor="primary" />
                <DashboardCard title="Shipped Orders" value={admin.dashboard.shippedOrders} icon={<Truck size={32} />} bgColor="info" />
                <DashboardCard title="Delivered Orders" value={admin.dashboard.deliveredOrders} icon={<CheckCircle size={32} />} bgColor="success" />
                <DashboardCard title="Cancelled Orders" value={admin.dashboard.cancalledOrders} icon={<Ban size={32} />} bgColor="danger" />
            </div>

            <div className="d-flex flex-wrap justify-content-center mt-4">
                <NavButton to='/admin/allorders' text="All Orders" />
                <NavButton to='/admin/allproducts' text="All Products" />
                <NavButton to='/admin/allusers' text="All Users" />
                <NavButton to='/admin/allsellers' text="All Sellers" />
                <NavButton to='/admin/allauctions' text="All Auctions" />
                <NavButton to='/admin/updateauction/1' text="Update Auction" />
                {/* <NavButton to='/admin/updateuser/1' text="Update User" /> */}
                <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>Logout</button>
            
            </div>
        </div>
    );
};

const DashboardCard = ({ title, value, icon, bgColor }) => (
    <div className="col-md-4 col-lg-3">
        <div className={`card shadow-sm text-white bg-${bgColor} p-3 d-flex align-items-center text-center`}>
            {icon}
            <h5 className="mt-2">{title}</h5>
            <p className="fs-4 fw-bold">{value}</p>
        </div>
    </div>
);

const NavButton = ({ to, text }) => (
    <Link to={to} className="btn btn-outline-success m-2 px-4 py-2 shadow-sm fw-bold">{text}</Link>
);

export default Admin;