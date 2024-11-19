import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    const [redirect, setRedirect] = useState(false);

    useEffect(()=>{
        const getSessionData = async () => {
            try {
                const sessionId = JSON.parse(localStorage.getItem("sessionId"));
                const response = await axios.get(`${apiBaseUrl}/payment/checkout-session?sessionId=${sessionId}`);
                localStorage.removeItem("sessionId");
                console.log("response:", response);
            } catch (err) {
                console.log(err);
            }
        };
        getSessionData();


        const timer = setTimeout(() => {
            setRedirect(true);
        }, 2000);
   
        return () => clearTimeout(timer);
    },[]);

    if (redirect) {
        return <Navigate to={'/'}/>;
       }    

    return(<div className='message-box-success'>
        <h1>✓</h1>
        <h2>Your payment was successful</h2>
        <p>Thank you for your payment. We will be in contact with more details shortly</p>
    </div>)
}

export default PaymentSuccess;