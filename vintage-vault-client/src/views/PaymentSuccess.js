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

    return(<div>Payment success!</div>)
}

export default PaymentSuccess;