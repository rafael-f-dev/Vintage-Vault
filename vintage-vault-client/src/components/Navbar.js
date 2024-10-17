import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <div className='navbar'>
            <NavLink to="/" style={styles.default} activeStyle={styles.active} >Home</NavLink>
            <NavLink to="/login" style={styles.default} activeStyle={styles.active} >Login</NavLink>
            <NavLink to="/register" style={styles.default} activeStyle={styles.active} >Register</NavLink>
            <NavLink to="/profile" style={styles.default} activeStyle={styles.active} >Profile</NavLink>
        </div>
    )
}

const styles = {
    active: {
       color: 'grey'
    },
    default: {
       color: 'white',
       textDecoration: 'none'
    }
}