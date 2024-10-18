import React, { useState } from 'react';
import { URL } from '../config.js';

const Products = () => {

    const [products, setProducts] = useState([])

    let getProds = () => {
        axios.get(`${URL}/product/`)
        .then((res)=>{
         setProducts(res.data)
        })
        .catch((err)=>{
          console.log(err)
        })
     }
     getProds()

     let renderProds = () => (
        products.map((prod,idx)=> <li key={idx}>{prod.name}</li>)
      )

    return (<div>
               <ul>
               {renderProds()}
               </ul>
           </div>
    )
};

export default Products;