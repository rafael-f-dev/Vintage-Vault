import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from '../config.js';

const Register = (props) => {

    const [message, setMessage] = useState("");
    const [form, setForm] = useState({
        email:"",
        password:"",
        password2:"",
    });

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    } 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
           const res = await axios.post(`${URL}/users/register`, {
              email: form.email,
              password: form.password,
              password2: form.password2
           })
           setMessage(res.data.data);
           if (res.data.ok) {
            try {
               await axios.post(`${URL}/email/register`, { email: form.email })
            } catch (err) {
                 console.log(err)
            }
            setTimeout(() => {
               props.login();
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

              <label>Confirm Password</label>
              <input type='password' name='password2' placeholder='Confirm password'/>
              <button className='form-button'>Register</button>

              <h4 className='message'>{message}</h4>
           </form>
    )
}

export default Register;