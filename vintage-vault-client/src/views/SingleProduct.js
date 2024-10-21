import React from 'react';

const SingleProduct = (props) => {
    return (<ul>
          <li className='prod' key={props.idx}>
          <img className='prod-img' src={props.product.image} alt='product'></img>
          <div className='prod-text-wrapper'>
          <p className='prod-name' >{props.product.name}</p>
          <p className='prod-price' >{props.product.price}€</p>
          <p className='prod-desc' >{props.product.description}</p>
          </div>
          </li>
        </ul>
    )
};

export default SingleProduct;