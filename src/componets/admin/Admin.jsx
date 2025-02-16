import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
    return (
        <>
            <div className="container">

                <div className="container d-flex m-2 p-2">

                    <Link to='/admin/allproducts' className='btn btn-success mx-1'>All Products </Link>
                    <Link to='/admin/allusers'className='btn btn-success mx-1' >All Users </Link>
                    <Link to='/admin/allauctions' className='btn btn-success mx-1'>All Auctions </Link>
                    <Link to='/admin/updateauction'className='btn btn-success mx-1' >Update Auction </Link>
                    <Link to='/admin/updateproduct' className='btn btn-success mx-1'>Update Product </Link>
                    <Link to='/admin/updateuser'className='btn btn-success mx-1' >Update User </Link>
                </div>
            </div>
        </>
    )
}

export default Admin