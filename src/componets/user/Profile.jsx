import React from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
  return (
    <>
    User Profile
    <Link to='/user/updateprofile' className='btn btn-success m-2'>Update Profile</Link>
    <Link to='/user/allorders' className='btn btn-success m-2'>All orders</Link>
    <Link to='/user/cart' className='btn btn-success m-2'>cart</Link>

    </>
  )
}

export default Profile