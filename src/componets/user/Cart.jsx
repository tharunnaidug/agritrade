import React from 'react'
import { Link } from 'react-router-dom'

const Cart = () => {
  return (
   <>
   Cart
   <Link to='/user/checkout' className='btn btn-success m-2'>Checkout</Link>

   </>
  )
}

export default Cart