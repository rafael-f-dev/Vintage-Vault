import React, { useState } from 'react';
import { URL } from '../config.js';
import axios from 'axios';

const Products = () => {

    const [products, setProducts] = useState([])

    let getProds = () => {
        axios.get(`${URL}/products/`)
        .then((res)=>{
         setProducts(res.data)
        })
        .catch((err)=>{
          console.log(err)
        })
     }
     getProds()

     let renderProds = () => (
        products.map((prod,idx)=> <li className='prod' key={idx}>
                                        <p className='prod-name' >{prod.name}</p>
                                        <p className='prod-price' >{prod.price}€</p>
                                        <img className='prod-img' src={prod.image}></img>
                                        <p className='prod-desc' >{prod.description}</p>
                                  </li>)
      )

    return (<div>
               <ul className='prod-list'>
               {renderProds()}
               </ul>
           </div>
    )
};

export default Products;