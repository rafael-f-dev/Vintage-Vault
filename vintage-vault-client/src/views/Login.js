import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { URL } from '../config.js';

const Login = (props) => {
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
           const res = await axios.post(`${URL}/users/login`, {
              email: form.email,
              password: form.password
           })
           setMessage(res.data.data);
           if (res.data.ok) {
            setTimeout(() => {
               props.login(res.data.token);
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

    return (<form onChange={handleChange} onSubmit={handleSubmit} className='form-container'>
              <label>Email</label>
              <input type='email' name='email' placeholder='Your email'/>

              <label>Password</label>
              <input type='password' name='password' placeholder='Your password'/>
              <button>Log in</button>

              <h4 className='message'>{message}</h4>
           </form>
    )
}

export default Login;