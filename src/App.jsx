import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import Admin from './componets/admin/Admin.jsx'
import Allusers from './componets/admin/Allusers.jsx'
import Allauctions from './componets/admin/Allauctions.jsx'
import Allproducts from './componets/admin/Allproducts.jsx'
import Updateauction from './componets/admin/Updateauction.jsx'
import Updateproduct from './componets/admin/Updateproduct.jsx'
import Updateuser from './componets/admin/Updateuser.jsx'
import Updateorder from './componets/admin/Updateorder.jsx'
import Allorders from './componets/admin/Allorders.jsx'
import Profile from './componets/user/Profile.jsx'
import Updateprofile from './componets/user/Updateprofile.jsx'
import Alluserorders from './componets/user/Alluserorders.jsx'
import Cart from './componets/user/Cart.jsx'
import Checkout from './componets/user/Checkout.jsx'
import Order from './componets/user/Order.jsx'
import Payment from './componets/user/Payment.jsx'
import Sregister from './componets/seller/Sregister.jsx'
import Slogin from './componets/seller/Slogin.jsx'
import Shome from './componets/seller/Shome.jsx'
import Allsellers from './componets/admin/Allsellers.jsx'
import Sallorders from './componets/seller/Sallorders.jsx'
import Sorder from './componets/seller/Sorder.jsx'
import Supdateorder from './componets/seller/Supdateorder.jsx'
import Sallproducts from './componets/seller/Sallproducts.jsx'
import Saddproduct from './componets/seller/Saddproduct.jsx'
import Supdateproduct from './componets/seller/Supdateproduct.jsx'
import Forgotpassword from './componets/user/Forgotpassword.jsx';
import Sforgotpassword from './componets/seller/Sforgotpassword.jsx';
import Product from './componets/products/Product.jsx';
import Alogin from './componets/admin/Alogin.jsx';

function App() {

  return (
    <Router>
      <ToastContainer />
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/products' element={<Products />} />
      <Route path='/product/:id' element={<Product />} />
      <Route path='/aboutus' element={<About />} />
      <Route path='/contactus' element={<Contact />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />

      <Route path='/otp' element={<Otp />} />

      <Route path='/auction' element={<Auction />} />
      <Route path='/userauction' element={<Userauctions />} />
      <Route path='/auctionlive' element={<Auctionlive />} />
      <Route path='/addcrop' element={<Addcrop />} />

      
      <Route path='/admin' element={<Admin />} />
      <Route path='/admin/login' element={<Alogin />} />
      <Route path='/admin/allusers' element={<Allusers />} />
      <Route path='/admin/allauctions' element={<Allauctions />} />
      <Route path='/admin/allproducts' element={<Allproducts />} />
      <Route path='/admin/allorders' element={<Allorders />} />
      <Route path='/admin/allsellers' element={<Allsellers />} />
      <Route path='/admin/updateauction/:id' element={<Updateauction />} />
      <Route path='/admin/updateproduct/:id' element={<Updateproduct />} />
      <Route path='/admin/updateuser/:id' element={<Updateuser />} />
      <Route path='/admin/updateorder/:id' element={<Updateorder />} />

      <Route path='/user/profile' element={<Profile />} />
      <Route path='/user/updateprofile' element={<Updateprofile />} />
      <Route path='/user/allorders' element={<Alluserorders />} />
      <Route path='/user/cart' element={<Cart />} />
      <Route path='/user/checkout' element={<Checkout />} />
      <Route path='/user/order/:id' element={<Order />} />
      <Route path='/user/payment' element={<Payment />} />
      <Route path='/user/forgotpassword' element={<Forgotpassword />} />


      <Route path='/seller' element={<Shome />} />
      <Route path='/seller/register' element={<Sregister />} />
      <Route path='/seller/login' element={<Slogin />} />
      <Route path='/seller/allorders' element={<Sallorders/>} />
      <Route path='/seller/allproducts' element={<Sallproducts/>} />
      <Route path='/seller/addproduct' element={<Saddproduct/>} />
      <Route path='/seller/order/:id' element={<Sorder/>} />
      <Route path='/seller/updateorder/:id' element={<Supdateorder/>} />
      <Route path='/seller/updateproduct/:id' element={<Supdateproduct/>} />
      <Route path='/seller/forgotpassword' element={<Sforgotpassword/>} />

      </Routes>
    </Router>
  )
}

export default App
