import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <img src="/logot.png" alt="logo" height={"350px"} />
      <h1>Welcome to AgriTarde</h1>
      <p>We will be live soon..!!</p>
      <Link to='/login' className='btn btn-success'>Login</Link>
    </>
  )
}

export default Home