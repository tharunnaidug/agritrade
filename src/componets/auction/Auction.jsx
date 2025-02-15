import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Auction = () => {
  return (
    <>
      <div className="container border border-danger rounded">
        <Link to='/addcrop'>Add your crop</Link>
      </div>
      <div className="container border border-danger rounded">
       <Link to='/userauction'> <p>Your Auctions</p></Link>
      </div>
      <div className="container border border-danger rounded">
        <h1>Auctions</h1>
      </div>
    </>
  )
}

export default Auction