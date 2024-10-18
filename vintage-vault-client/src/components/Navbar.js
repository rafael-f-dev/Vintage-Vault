import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

    return (
        <div className='navbar'>
            <NavLink to={"/"} className={({ isActive }) => (isActive ? 'active' : 'default')} >Home</NavLink>
            <NavLink to={"/login"} className={({ isActive }) => (isActive ? 'active' : 'default')} >Login</NavLink>
            <NavLink to={"/register"} className={({ isActive }) => (isActive ? 'active' : 'default')} >Register</NavLink>
            <NavLink to={"/profile"} className={({ isActive }) => (isActive ? 'active' : 'default')} >Profile</NavLink>
            <NavLink to={"/cart"} className={({ isActive }) => (isActive ? 'active' : 'default')} >Cart</NavLink>
        </div>
    )
}

export default Navbar;