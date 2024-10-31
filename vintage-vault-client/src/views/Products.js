import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { URL } from '../config.js';
import axios from 'axios';

const Products = () => {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("All");
    const [filtered, setFiltered] = useState([]);

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

      const getCategories = () => {
        axios.get(`${URL}/products/categories`)
           .then((res) => {
               setCategories(res.data);
           })
           .catch((err) => {
               console.log(err);
           });
    };

       getProds();
       getCategories();
    }, []);

    useEffect(() => {
        if (categoryId !== "All") {
            getFiltered(categoryId);
        } 
    },[categoryId])

    const getFiltered = (categoryId) => {
          axios.get(`${URL}/products/categoryId`, {
            params: { category: categoryId }
        })
          .then((res) => {
              console.log(categoryId)
              console.log("response data:", res.data)
              setFiltered(res.data);
          })
          .catch((err) =>{
              console.log(err);
          });
      };
    
    const handleChange = (e) => {
        setCategoryId(e.target.value);
    }


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

      let renderFiltered = () => (
        filtered.map((prod,idx)=> <NavLink to={`/id/${prod._id}`} className='prod' key={idx}>
                                        <img className='prod-img' src={prod.image} alt='product'></img>
                                        <div className='prod-text-wrapper'>
                                        <p className='prod-name' >{prod.name}</p>
                                        <p className='prod-price' >{prod.price}€</p>
                                        <p className='prod-desc' >{prod.description}</p>
                                        </div>
                                   </NavLink>)
      )

      let renderCats = () => (
         categories.map((cat, idx) => <option value={cat} key={idx} >{cat}</option>)
      )  

    return (<div>
               <div>
                <form onChange={handleChange} className='filter-form'>
                    <label htmlFor='categories' >Filter</label>
                    <select name='categories'>
                    <option value='All'>All</option>
                    {renderCats()}
                    </select>
                </form>
               </div>
               <div className='prod-grid'>
                {categoryId === "All" ? renderProds() : renderFiltered()}
               </div>
           </div>
    )
};

export default Products;