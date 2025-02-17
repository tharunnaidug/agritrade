import React from 'react'
import { Link } from 'react-router-dom'

const Checkout = () => {
  return (
    <>Checkout
        <Link to='/user/payment' className='btn btn-success m-2'>Payment</Link>

    </>
  )
}

export default Checkout