import React, { useState, useEffect } from 'react';

const Cart = (props) => {

  const [totalCart,setTotalCart] = useState(0);
 
  const removeFromCart = (productId) => {
    const updatedCart = props.cart.filter(prod => prod._id !== productId);
    props.setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  useEffect(()=>{
     totalPrice();
  },[totalCart,props.cart])

  const increment = (idx) => {
    const newCart = [...props.cart];
    newCart[idx].quantity += 1;
    props.setCart(newCart);
    calcTotal()
  }

  const decrement = (idx) => {
    const newCart = [...props.cart];
    newCart[idx].quantity -= 1;
    props.setCart(newCart);
    calcTotal()
  }
 
  const calcTotal = () => {
    const newCart2 = props.cart.map(prod => ({
      ...prod,
      price: prod.price * prod.quantity
    }));
    props.setCart(newCart2);
  }

  const totalPrice = () => {
    var total = 0;
    props.cart.forEach(prod => {
      total += prod.price;
    });
    setTotalCart(total);
  }

  let renderCart = () => (
    props.cart.map((prod,idx)=> <li className='prod' key={idx}>
                                    <img className='prod-img' src={prod.image} alt='product'></img>
                                    <div className='prod-text-wrapper'>
                                    <p className='prod-name' >{prod.name}</p>
                                    <p className='prod-price' >{prod.price}€</p>
                                    <p className='prod-desc' >{prod.description}</p>
                                    <button onClick={()=> increment(idx)}>+</button>
                                    <p classname='prod-qty'>{prod.quantity}</p>
                                    <button onClick={()=> decrement(idx)}>-</button>
                                    </div>
                                    <button onClick={() => removeFromCart(prod._id)}>X</button>
                               </li>)
  )

    return (<div>
             <h1>Shopping Cart</h1>
             {props.cart.length === 0 ? 
             <h2>You have nothing in your shopping cart.</h2>
             :
             <div>
             <ul>{renderCart()}</ul>
             <h2 className='total-price'>Subtotal: {totalCart}</h2>
             </div>}
             
            </div>
    )
};

export default Cart;