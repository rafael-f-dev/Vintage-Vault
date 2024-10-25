import React, { useState, useEffect } from 'react';
import { URL } from '../config.js';
import axios from 'axios';
import { useStripe } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

const Cart = (props) => {

  const [totalCart,setTotalCart] = useState(0);
  const stripe = useStripe();
  const navigate = useNavigate();
  
 
  const removeFromCart = (productId) => {
    const updatedCart = props.cart.filter(prod => prod._id !== productId);
    props.setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calcTotal(updatedCart);
  }

  useEffect(()=>{
     calcTotal(props.cart);
  },[props.cart])

  const increment = (idx) => {
    const newCart = [...props.cart];
    newCart[idx].quantity += 1;
    props.setCart(newCart);
    calcTotal(newCart);
  }

  const decrement = (idx) => {
    const newCart = [...props.cart];
    if (newCart[idx].quantity > 1) {
    newCart[idx].quantity -= 1;
    }
    props.setCart(newCart);
    calcTotal(newCart)
  }

  const calcTotal = (cart) => {
    const total = cart.reduce((acc, prod) => {
      return acc + (prod.price * prod.quantity);
    }, 0);
    setTotalCart(total);
  }

  const createCheckoutSession = async () => {
    try{
       const res = await axios.post(`${URL}/payment/create-checkout-session`, { cart: props.cart })
       console.log('Response from server:', res.data);
       if (res.data.ok) {
        localStorage.setItem("sessionId", JSON.stringify(res.data.sessionId));
        await redirect(res.data.sessionId);
       } else {
        navigate("/payment/error");
       }
    } catch (err) {
      console.log(err)
      navigate("/payment/error");
    }
  }

  const redirect = (sessionId) => {
    stripe.redirectToCheckout({sessionId})
     .then((result) => console.log(result));
  }

  let renderCart = () => (
    props.cart.map((prod,idx)=> <li className='cart-prod' key={prod._id}>
                                    <img className='prod-img' src={prod.image} alt='product'></img>
                                    <div className='cart-prod-text-wrapper'>
                                    <p className='cart-prod-name' >{prod.name}</p>
                                    <p className='prod-desc' >{prod.description}</p>
                                    </div>
                                    <div className='cart-prod-qty-wrapper'>
                                    <button className='cart-prod-button' onClick={()=> increment(idx)}>+</button>
                                    <p classname='prod-qty'>{prod.quantity}</p>
                                    <button className='cart-prod-button' onClick={()=> decrement(idx)}>-</button>
                                    </div>
                                    <p className='cart-prod-price' >{(prod.price * prod.quantity).toFixed(2)}€</p>
                                    <button onClick={() => removeFromCart(prod._id)}>X</button>
                               </li>)
  )

    return (<div className='cart'>
             <h1>Shopping Cart</h1>
             {props.cart.length === 0 ? 
             <h2>You have nothing in your shopping cart.</h2>
             :
             <div>
             <ul className='cart-grid'>{renderCart()}</ul>
             <h2 className='total-price'>Subtotal: {totalCart.toFixed(2)}€</h2>
             </div>}
             <button onClick={()=> createCheckoutSession()}>Checkout</button>
            </div>
    )
};

export default Cart;