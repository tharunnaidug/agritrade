import React from 'react'
import { Link } from 'react-router-dom'

const Alluserorders = () => {
  return (
    <>Allorders of a user
        <Link to='/user/order' className='btn btn-success m-2'> order</Link>

    </>
  )
}

export default Alluserorders