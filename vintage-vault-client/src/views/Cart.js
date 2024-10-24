import React, { useState, useEffect } from 'react';

const Cart = (props) => {

  const [totalCart,setTotalCart] = useState(0);
 
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
             
            </div>
    )
};

export default Cart;