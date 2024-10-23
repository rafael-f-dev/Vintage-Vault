import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { URL } from '../config.js';
import axios from 'axios';

const Products = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
      const getProds = () => {
          axios.get(`${URL}/products/`)
              .then((res) => {
                  setProducts(res.data);
              })
              .catch((err) => {
                  console.log(err);
              });
      };

      getProds();
    }, []);


     let renderProds = () => (
        products.map((prod,idx)=> <NavLink to={`/id/${prod._id}`} className='prod' key={idx}>
                                        <img className='prod-img' src={prod.image} alt='product'></img>
                                        <div className='prod-text-wrapper'>
                                        <p className='prod-name' >{prod.name}</p>
                                        <p className='prod-price' >{prod.price}€</p>
                                        <p className='prod-desc' >{prod.description}</p>
                                        </div>
                                   </NavLink>)
      )

    return (<div>
               <div className='prod-grid'>
               {renderProds()}
               </div>
           </div>
    )
};

export default Products;