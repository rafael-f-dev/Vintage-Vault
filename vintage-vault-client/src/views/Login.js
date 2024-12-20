import React, { useState , useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';


const Login = (props) => {

    const apiLoginUrl = process.env.REACT_APP_API_LOGIN_ROUTE;

    const [message, setMessage] = useState("");
    const [form, setForm] = useState({
        email:"",
        password:"",
    });

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    } 
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
           const res = await axios.post(`${apiLoginUrl}`, {
              email: form.email,
              password: form.password
           })
           console.log(res.data)
           setMessage(res.data.data);
           if (res.data.ok) {
            setTimeout(() => {
               props.login(res.data.token,res.data.userId);
            },1500)
           }
        } catch (err){
           console.log(err)
        }
    }

    useEffect(() => {
        setTimeout(() => {
           setMessage("")
        }, 1500)
    },[message])

    return (
    <div className='form'>
    <form onChange={handleChange} onSubmit={handleSubmit} className='form-container'>
              <label>Email</label>
              <input type='email' name='email' placeholder='Your email'/>
              <label>Password</label>
              <input type='password' name='password' placeholder='Your password'/>
              <button className='form-button'>Log in</button>
              <NavLink to={"/register"} className='form-button' >Create Account</NavLink>
              <h4 className='message'>{message}</h4>
           </form>
           </div>
    )
}

export default Login;