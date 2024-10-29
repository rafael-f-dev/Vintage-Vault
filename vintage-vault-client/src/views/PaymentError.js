import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const PaymentError = () => {

   const [redirect, setRedirect] = useState(false);

   useEffect(()=> {
      const timer = setTimeout(() => {
         setRedirect(true);
     }, 2000);

     return () => clearTimeout(timer);
   },[])

   if (redirect) {
    return <Navigate to={'/'}/>;
   }

    return(<div className='message-box-failure'>
        <h1>X</h1>
        <h2>Your payment failed</h2>
        <p>Please try again</p>
    </div>)
}

export default PaymentError;