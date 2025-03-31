import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import {  TriangleAlert } from 'lucide-react';

const Auction = () => {
  const { isAuth } = useContext(AppContext);


  if(!isAuth){
    return (
      <>
      <TriangleAlert className='mt-5' />
      <div className="text-center ">Looks like you are not logged in ..!</div> 
      <Link to='/login' className='btn btn-success mt-4'>Login Now</Link>
      </>
    );
  }

  return (
    <>
      <div className="container border border-danger rounded">
        <Link to='/addcrop'>Add your crop</Link>
      </div>
      <div className="container border border-danger rounded">
       <Link to='/userlistedauction'> <p>Your Listed Auctions</p></Link>
      </div>
      <div className="container border border-danger rounded">
       <Link to='/userauctions'> <p>Your Auctions</p></Link>
      </div>
      <div className="container border border-danger rounded">
        <h1>Auctions</h1>
      </div>
    </>
  )
}

export default Auction