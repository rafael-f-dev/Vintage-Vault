import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Home from './views/Home.js';
import Login from './views/Login.js';
import Register from './views/Register.js';
import Profile from './views/Profile.js';
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
          <Route path ="/" render={Home}/>
          <Route path ="/login" render={(props) => isLoggedIn ? <Navigate to="/"/> : <Login login={login} />}/>
          <Route path ="/register" render={(props) => isLoggedIn ? <Navigate to="/"/> : <Register login={login} />}/>
          <Route path ="/profile" render={(props) => isLoggedIn ? <Profile logout={logout} /> : <Navigate to="/"/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
