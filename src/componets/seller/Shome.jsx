import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../../context/AppContext';

const Shome = () => {
  const { seller } = useContext(AppContext);
  return (
    <>
      <h2 className='text-center mb-3'>Welcome  {seller?.username}</h2>
      <div className="container d-flex flex-column">
        <Link to='/seller/addproduct' className='btn btn-success m-1'>Add Product</Link>
        <Link to='/seller/allproducts' className='btn btn-success m-1'>Your Products</Link>
        <Link to='/seller/allorders' className='btn btn-success m-1'>Your Orders</Link>
        <Link to='/seller/updateorder' className='btn btn-success m-1'>Update Order</Link>
        {/* <Link to='/seller/updateproduct' className='btn btn-success m-1'>Update Product</Link> */}
      </div>
    </>
  )
}

export default Shome