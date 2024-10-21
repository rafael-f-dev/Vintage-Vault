import React, { useState, useEffect } from 'react';
import { URL } from '../config.js';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleProduct = (props) => {

    const [product, setProduct] = useState([])

    const { id } = useParams();

   useEffect(() => {
        const getProd = () => {
            axios.get(`${URL}/products/id/${id}`) 
                .then((res) => {
                    setProduct(res.data);
                })
                .catch((err) => {
                    console.error(err);
                });
        };

        getProd();
    }, [id]);
    
    const addToCart = () => {
        
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
        
        const productExists = existingCart.some(item => item._id === product._id);

        if (!productExists) {
            const newCart = [...existingCart, product];
            props.setCart(newCart);
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
    };

        return (
            <div className='prod'>
                <img className='prod-img' src={product.image} alt='product' />
                <div className='prod-text-wrapper'>
                    <h1 className='prod-name'>{product.name}</h1>
                    <p className='prod-price'>{product.price}€</p>
                    <p className='prod-desc'>{product.description}</p>
                </div>
                <button onClick={addToCart}>Add to cart</button>
            </div>
        );
    };

export default SingleProduct;