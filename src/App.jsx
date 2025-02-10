import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Products from './componets/products/Products.jsx'
import Auction from './componets/auction/Auction.jsx'
import About from './componets/About.jsx'
import Contact from './componets/Contact.jsx'
import Home from './componets/Home.jsx'

function App() {

  return (
    <Router>
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/products' element={<Products />} />
      <Route path='/auction' element={<Auction />} />
      <Route path='/aboutus' element={<About />} />
      <Route path='/contactus' element={<Contact />} />
      </Routes>
    </Router>
  )
}

export default App
