import React from 'react';

const Cart = (props) => {
 
  const removeFromCart = (productId) => {
    const updatedCart = props.cart.filter(prod => prod._id !== productId);
    props.setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  let renderCart = () => (
    props.cart.map((prod,idx)=> <li className='prod' key={idx}>
                                    <img className='prod-img' src={prod.image} alt='product'></img>
                                    <div className='prod-text-wrapper'>
                                    <p className='prod-name' >{prod.name}</p>
                                    <p className='prod-price' >{prod.price}€</p>
                                    <p className='prod-desc' >{prod.description}</p>
                                    <p classname='prod-qty'>{prod.quantity}</p>
                                    </div>
                                    <button onClick={() => removeFromCart(prod._id)}>X</button>
                               </li>)
  )

    return (<div>
             {props.cart.length === 0 ? 
             <h2>Cart is empty!</h2>
             : 
             <ul>{renderCart()}</ul>}
            </div>
    )
};

export default Cart;