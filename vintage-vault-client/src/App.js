import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Navbar from './components/Navbar.js';
import Home from './views/Home.js';
import Products from './views/Products.js';
import Login from './views/Login.js';
import Register from './views/Register.js';
import Profile from './views/Profile.js';
import Cart from './views/Cart.js';
import PaymentSuccess from './views/PaymentSuccess.js';
import PaymentError from './views/PaymentError.js';
import SingleProduct from './views/SingleProduct.js';
import axios from 'axios';
import { URL } from './config.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './fonts/CroissantOne-Regular.ttf';
import './App.css';

const stripeProvider = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const token = JSON.parse(localStorage.getItem("token"));
  const userId = localStorage.getItem("userId"); 

  useEffect(() => {
    const verify_token = async () => {
      if (token === null) setIsLoggedIn(false);
      try {
         axios.defaults.headers.common["Authorization"] = token;
         const res = await axios.post(`${URL}/users/verify_token`)
         return res.data.ok ? login(token, userId) : logout()
      } catch(err) {
        console.log(err)
      }
    };
    verify_token();
  });


  useEffect(() => {
    setCartCount(cart.length);
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const login = (token, userId) => {
    token && localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("userId", userId); 
    setIsLoggedIn(true);
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  }


  return (
    <div className="App">
      <Router>
        <Navbar userId={userId} cartCount={cartCount}/>
        <Elements stripe={stripeProvider}>
        <Routes>
          <Route path ="/" element={<Home/>}/>
          <Route path ="/products" element={<Products/>}/>
          <Route path ="/login" element={isLoggedIn ? <Navigate to="/"/> : <Login login={login} />}/>
          <Route path ="/register" element={isLoggedIn ? <Navigate to="/"/> : <Register login={login} />}/>
          <Route path ="/profile/:userId" element={isLoggedIn ? <Profile userId={userId} logout={logout} /> : <Navigate to="/"/>}/>
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart}/>}/>
          <Route path="/payment" element={<Cart />}/>
          <Route path="/id/:id" element={<SingleProduct cart={cart} setCart={setCart}/>}/>
          <Route path="/payment/success" element={<PaymentSuccess/>}/>
          <Route path="/payment/error" element={<PaymentError/>}/>
        </Routes>
        </Elements>
      </Router>
    </div>
  );
}

export default App;
