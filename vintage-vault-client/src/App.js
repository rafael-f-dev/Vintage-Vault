import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar.js';
import Home from './views/Home.js';
import Login from './views/Login.js';
import Register from './views/Register.js';
import Profile from './views/Profile.js';
import axios from 'axios';
import { URL } from './config.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    const verify_token = async () => {
      if (token === null) setIsLoggedIn(false);
      try {
         axios.defaults.headers.common["Authorization"] = token;
         const res = await axios.post(`${URL}/users/verify_token`)
         return res.data.ok ? login(token) : logout()
      } catch(err) {
        console.log(err)
      }
    };
    verify_token();
  }, []);

  const login = (token) => {
    token && localStorage.setItem("token", JSON.stringify(token));
    setIsLoggedIn(true);
  }

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path ="/" element={<Home/>}/>
          <Route path ="/login" element={isLoggedIn ? <Navigate to="/"/> : <Login login={login} />}/>
          <Route path ="/register" element={isLoggedIn ? <Navigate to="/"/> : <Register login={login} />}/>
          <Route path ="/profile" element={isLoggedIn ? <Profile logout={logout} /> : <Navigate to="/"/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
