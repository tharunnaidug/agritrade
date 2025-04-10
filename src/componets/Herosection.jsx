import React from 'react';
import { Link } from 'react-router-dom';
import { Store, ShoppingCart, Tractor, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Herosection = () => {
  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center text-white"
      style={{
        background: 'linear-gradient(135deg, #1e5128, #aacc00)',
        minHeight: '85vh',
        padding: '2rem',
      }}
    >
      <motion.div
        className="text-center p-5 rounded shadow"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(6px)',
          maxWidth: '800px',
          width: '100%',
        }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className="display-4 fw-bold mb-5 text-light">
          Welcome to <span className="text-warning">AgriTrade</span>
        </h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <h4 className="mb-3">Are you a <span className="text-warning">Farmer</span>?</h4>
          <div className="d-flex flex-wrap justify-content-center gap-4 mb-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/products" className="btn btn-light btn-lg px-4 d-flex align-items-center gap-2 text-dark">
                <ShoppingCart size={20} /> Marketplace
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/auction" className="btn btn-outline-light btn-lg px-4 d-flex align-items-center gap-2">
                <Tractor size={20} /> Auctions
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <h4 className="mb-3">Are you a <span className="text-warning">Seller</span>?</h4>
          <div className="d-flex justify-content-center mb-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/seller/login" className="btn btn-success btn-lg w-auto px-4 d-flex align-items-center gap-2">
                <Store size={20} /> Seller Login
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <h4 className="mb-3">Are you an <span className="text-warning">Admin</span>?</h4>
          <div className="d-flex justify-content-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/admin/login" className="btn btn-warning btn-lg w-auto px-4 d-flex align-items-center gap-2 text-dark">
                <Shield size={20} /> Admin Login
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Herosection;
