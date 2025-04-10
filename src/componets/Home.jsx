import React from 'react';
import { Link } from 'react-router-dom';
import Announcementbar from './Announcementbar';
import Herosection from './Herosection';
import Homepreview from './Homepreview';

const Home = () => {
  // return (
  //   <>
  //     <img src="/logot.png" alt="logo" height={"350px"} />
  //     <h1>Welcome to AgriTarde</h1>
  //     <p>We will be live soon..!!</p>
  //     <Link to='/user/profile' className='btn btn-success m-2'>Profile</Link>
  //     <Link to='/login' className='btn btn-success m-2'>Login</Link>
  //     <Link to='/admin/login' className='btn btn-success m-2'>Admin</Link>
  //     <Link to='/seller/login' className='btn btn-success m-2'>Seller login</Link>
  //   </>
  // )
  return (
    <>
      <Announcementbar message="🎉 We're now live! Hope you enjoy AgriTrade v1.0 !!" />
      <Herosection />
      <Homepreview />
    </>
  );
};

export default Home;