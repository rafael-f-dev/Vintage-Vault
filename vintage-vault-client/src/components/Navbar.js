import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {

    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 800 && menuOpen) {
                setMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[menuOpen]);

    return (
        <div>
        <div className='navbar'>
            <NavLink to={"/"} className={({ isActive }) => (isActive ? 'active-logo' : 'default-logo')} >Vintage Vault.</NavLink>
            <div className='menu' onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={menuOpen ? 'close-menu-open' : 'close-menu'} onClick={() => setMenuOpen(!menuOpen)}>X</div>
            <div className={menuOpen ? "nav-links-open" : "nav-links"}>
            <NavLink to={"/products"} onClick={() => setMenuOpen(false)} className={({ isActive }) => (isActive ? 'active' : 'default')} >Products</NavLink>
            {!props.userId && <NavLink to={"/login"} onClick={() => setMenuOpen(false)} className={({ isActive }) => (isActive ? 'active' : 'default')} >Login</NavLink>}
            {props.userId && <NavLink to={"/profile"} onClick={() => setMenuOpen(false)} className={({ isActive }) => (isActive ? 'active' : 'default')} >Profile</NavLink>}
            <NavLink to={"/cart"} onClick={() => setMenuOpen(false)} className={({ isActive }) => (isActive ? 'active' : 'default')} >Cart ({props.cartCount})</NavLink>
            </div>
        </div>
        </div>
    )
}

export default Navbar;