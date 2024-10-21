import React, { useState, useEffect } from 'react';
import { URL } from '../config.js';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleProduct = () => {

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
    

        return (
            <div className='single-product'>
                <img className='prod-img' src={product.image} alt='product' />
                <div className='prod-text-wrapper'>
                    <h1 className='prod-name'>{product.name}</h1>
                    <p className='prod-price'>{product.price}€</p>
                    <p className='prod-desc'>{product.description}</p>
                </div>
            </div>
        );
    };

export default SingleProduct;