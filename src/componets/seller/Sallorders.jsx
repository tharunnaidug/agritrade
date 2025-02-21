import React from 'react'
import { Link } from 'react-router-dom'

const Sallorders = () => {
  return (
    <>
    All orders of Seller
    <Link to='/seller/order' className='btn btn-success m-1'>Order</Link>
    </>
  )
}

export default Sallorders