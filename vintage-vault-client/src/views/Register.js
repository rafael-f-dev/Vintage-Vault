import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Register = (props) => {

   const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

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
           const res = await axios.post(`${apiBaseUrl}/users/register`, {
              email: form.email,
              password: form.password,
              password2: form.password2
           })
           setMessage(res.data.data);
           if (res.data.ok) {
            try {
               await axios.post(`${apiBaseUrl}/email/register`, { email: form.email })
            } catch (err) {
                 console.log(err)
            }
            setTimeout(() => {
               props.login(res.data.token,res.data.userId);
            },1200)
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

    return (<div className='form'>
            <form onChange={handleChange} onSubmit={handleSubmit} className='form-container'>
              <label>Email</label>
              <input type='email' name='email' placeholder='Your email'/>

              <label>Password</label>
              <input type='password' name='password' placeholder='Your password'/>

              <label>Confirm Password</label>
              <input type='password' name='password2' placeholder='Confirm password'/>
              <button className='form-button'>Register</button>

              <h4 className='message'>{message}</h4>
           </form>
           </div>
    )
}

export default Register;