import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {

    return (
        <div className='navbar'>
            <NavLink to={"/"} className={({ isActive }) => (isActive ? 'active-logo' : 'default-logo')} >Vintage Vault.</NavLink>
            <NavLink to={"/products"} className={({ isActive }) => (isActive ? 'active' : 'default')} >Products</NavLink>
            <NavLink to={"/login"} className={({ isActive }) => (isActive ? 'active' : 'default')} >Login</NavLink>
            <NavLink to={"/profile"} className={({ isActive }) => (isActive ? 'active' : 'default')} >Profile</NavLink>
            <NavLink to={"/cart"} className={({ isActive }) => (isActive ? 'active' : 'default')} >Cart ({props.cartCount})</NavLink>
        </div>
    )
}

export default Navbar;