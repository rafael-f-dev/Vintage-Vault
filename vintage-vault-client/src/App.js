import React, { useState } from 'react';
import Navbar from './components/Navbar.js';
import Home from './views/Home.js';
import Login from './views/Login.js';
import Register from './views/Register.js';
import Profile from './views/Profile.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  }

  const logout = () => {
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
