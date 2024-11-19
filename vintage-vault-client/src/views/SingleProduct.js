import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleProduct = (props) => {

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    const [product, setProduct] = useState([])

    const { id } = useParams();

   useEffect(() => {
        const getProd = () => {
            axios.get(`${apiBaseUrl}/products/id/${id}`) 
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

        const newProduct0 = {...product};
        newProduct0.quantity = 1;
        setProduct(newProduct0);
    };


    const increment = () => {
        const newProduct = {...product};
        newProduct.quantity += 1;
        setProduct(newProduct);
    }

    const decrement = () => {
        const newProduct2 = {...product};
        newProduct2.quantity -= 1;
        setProduct(newProduct2);
    }
    
        return (
            <div className='prod'>
                <img className='prod-img' src={product.image} alt='product' />
                <div className='prod-text-wrapper'>
                    <h1 className='prod-name'>{product.name}</h1>
                    <p className='prod-price'>{product.price}€</p>
                    <p className='prod-desc'>{product.description}</p>
                    {product.onstock === "True" ?
                    <div>
                    <button onClick={increment}>+</button>
                    <p className='prod-qty'>{product.quantity}</p>
                    <button onClick={decrement}>-</button>
                    </div>
                     : <p className='out-of-stock' >This item is out of stock</p>}
                </div>
                {product.onstock === "True" ?
                <button onClick={addToCart}>Add to cart</button>
                 : null }
                </div>
        );
    };

export default SingleProduct;