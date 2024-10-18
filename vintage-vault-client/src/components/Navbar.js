import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

    return (
        <div className='navbar'>
            <NavLink to={"/"} className={({ isActive }) => (isActive ? 'active' : 'default')} >Home</NavLink>
            <NavLink to={"/login"} className={({ isActive }) => (isActive ? 'active' : 'default')} >Login</NavLink>
            <NavLink to={"/profile"} className={({ isActive }) => (isActive ? 'active' : 'default')} >Profile</NavLink>
            <NavLink to={"/cart"} className={({ isActive }) => (isActive ? 'active' : 'default')} >Cart (0)</NavLink>
        </div>
    )
}

export default Navbar;