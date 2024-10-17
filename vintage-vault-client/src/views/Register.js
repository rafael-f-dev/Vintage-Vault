import React, { useState } from 'react';

const Register = (props) => {
    const [form, setForm] = useState({
        email:"",
        password:"",
        password2:"",
    });

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        try{
           props.login();
        } catch (err){
           console.log(err)
        }
    }

    return (<form onChange={handleChange} onSubmit={handleSubmit} className='form-container'>
              <label>Email</label>
              <input type='email' name='email' placeholder='Your email'/>

              <label>Password</label>
              <input type='password' name='password' placeholder='Your password'/>

              <label>Confirm Password</label>
              <input type='password' name='password2' placeholder='Confirm password'/>
              <button>Register</button>
           </form>
    )
}

export default Register;