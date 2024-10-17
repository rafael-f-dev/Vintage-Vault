import React from 'react';
import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Home from './views/Home.js';
import Login from './views/Login.js';
import Register from './views/Register.js';
import Profile from './views/Profile.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
        <Routes>
          <Route path ="/" component={Home}/>
          <Route path ="/login" component={Login}/>
          <Route path ="/register" component={Register}/>
          <Route path ="/profile" component={Profile}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
