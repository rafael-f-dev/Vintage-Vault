import React, { useEffect } from 'react';
import axios from 'axios';
import {URL} from '../config.js';

const PaymentSuccess = () => {
    useEffect(()=>{
        const getSessionData = async () => {
            try {
                const sessionId = JSON.parse(localStorage.getItem("sessionId"));
                const response = await axios.get(`${URL}/payment/checkout-session?sessionId=${sessionId}`);
                localStorage.removeItem("sessionId");
                console.log("response:", response);
            } catch (err) {
                console.log(err);
            }
        };
        getSessionData();
    },[]);

    return(<div className='message-box-success'>
        <h1>✓</h1>
        <h2>Your payment was successful</h2>
        <p>Thank you for your payment. We will be in contact with more details shortly</p>
    </div>)
}

export default PaymentSuccess;