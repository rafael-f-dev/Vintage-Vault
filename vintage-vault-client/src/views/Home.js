import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
    return (<div>
             <div className='splash-screen'>
                <h2>Some message</h2>
                <NavLink to={"/products"} className="splash-screen-button" >Shop Now</NavLink>
             </div>
           </div>
    )
};

export default Home;