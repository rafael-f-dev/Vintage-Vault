import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
    return (<div>
             <div className='splash-screen-background'>
              <div className='splash-screen-content'>
                <h1 className='splash-screen-title'>'Where History Meets Style'</h1>
                <NavLink to={"/products"} className="splash-screen-button" >Shop Now</NavLink>
              </div>
             </div>
           </div>
    )
};

export default Home;