import React from 'react'
import { Link } from 'react-router-dom'

const Shome = () => {
  return (
    <>
    <div className="container d-flex flex-column">
    <Link to='/seller/addproduct' className='btn btn-success m-1'>Add Product</Link>
    <Link to='/seller/allproducts' className='btn btn-success m-1'>Your Products</Link>
    <Link to='/seller/allorders' className='btn btn-success m-1'>Your Orders</Link>
    <Link to='/seller/updateorder' className='btn btn-success m-1'>Update Order</Link>
    <Link to='/seller/updateproduct' className='btn btn-success m-1'>Update Product</Link>
    <Link to='/seller/register' className='btn btn-success m-1'>Register</Link>
    <Link to='/seller/login' className='btn btn-success m-1'>Login</Link>
    </div>
    </>
  )
}

export default Shome