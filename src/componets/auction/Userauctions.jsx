import React from 'react'
import { Link } from 'react-router-dom'


const Userauctions = () => {
  return (
    <>
    <div className="container">Pending Auctions</div>
    <Link to='/auctionlive'> <p>Your Auctions</p></Link>
    <div className="container">Past Auctions</div>
    </>
  )
}

export default Userauctions