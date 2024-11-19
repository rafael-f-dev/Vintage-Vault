import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from '../config.js';


const DeleteAcc = (props) => {

    const apiDeleteUrl = process.env.REACT_APP_API_DELETE_ROUTE;

    const logout = props.logout;

    const [form, setForm] = useState({
        email:"",
        password:"",
    });

    const [deleted, setDeleted] = useState(false);
   
    useEffect(()=>{
        if (deleted) {
            alert("Account deleted");
            logout();
        }
    },[deleted,logout])
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${apiDeleteUrl}`, {
                email: form.email,
                password: form.password
            })
            console.log(res.data)
            if (res.data.ok) {
               setDeleted(true);
            } else {
                alert("Insert your credentials");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    } 

    return(<div className='form'>
           <form onChange={handleChange} onSubmit={handleSubmit} className='form-container'>
             <label>Confirm Email</label>
             <input type='email' name='email' placeholder='your email'/>
             <label>Confirm Password</label>
             <input type='password' name='password' placeholder='your password'/>
             <button className='delete-account-button'>Delete Account</button>
           </form>
           </div>)
}

export default DeleteAcc;