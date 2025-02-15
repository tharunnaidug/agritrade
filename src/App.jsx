import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Products from './componets/products/Products.jsx'
import Auction from './componets/auction/Auction.jsx'
import About from './componets/About.jsx'
import Contact from './componets/Contact.jsx'
import Home from './componets/Home.jsx'
import Register from './componets/Register.jsx'
import Login from './componets/Login.jsx'
import Otp from './componets/Otp.jsx'
import Auctionlive from './componets/auction/Auctionlive.jsx'
import Addcrop from './componets/auction/Addcrop.jsx'
import Userauctions from './componets/auction/Userauctions.jsx'

function App() {

  return (
    <Router>
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/products' element={<Products />} />
      <Route path='/aboutus' element={<About />} />
      <Route path='/contactus' element={<Contact />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />

      <Route path='/otp' element={<Otp />} />

      <Route path='/auction' element={<Auction />} />
      <Route path='/userauction' element={<Userauctions />} />
      <Route path='/auctionlive' element={<Auctionlive />} />
      <Route path='/addcrop' element={<Addcrop />} />

      </Routes>
    </Router>
  )
}

export default App
