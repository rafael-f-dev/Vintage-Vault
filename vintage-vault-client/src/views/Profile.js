import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Profile = (props) => {

   const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

   const userId = props.userId
   const [form, setForm] = useState({
    firstname:"",
    lastname:"",
    phonenumber:0,
    city:"",
    postalcode:0,
    billingaddress:"",
    deliveryaddress:"",
    _id: "",
   })

   const [isEdit,setIsEdit] = useState(false);

   useEffect(()=>{
    if (userId) {
        getUser(userId);
     } else {
        localStorage.getItem('userId');
        getUser(userId);
     }
   }, [userId]);

   useEffect(()=>{
    console.log(form)
   },[form])

   const getUser = async (userId) => {
    try{
        const response = await axios.get(`${apiBaseUrl}/users/get/${userId}`);
        if(response.data) {
            setForm(response.data);
        } else {
            alert("Something went wrong");
        }
    } catch (err) {
        console.log(err);
    }
   }

    const handleChange = (e) => {
       setForm({...form, [e.target.name]: e.target.value});
    } 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
           const response = await axios.post(`${apiBaseUrl}/users/update/${userId}`, {
            updateData: {
              firstname: form.firstname,
              lastname: form.lastname,
              phonenumber: form.phonenumber,
              city: form.city,
              postalcode: form.postalcode,
              billingaddress: form.billingaddress,
              deliveryaddress: form.deliveryaddress,
              }
           });
           if (response.data.ok) {
            getUser(userId)
           }
        } catch (err){
           console.log(err)
         }
    }

    const handleEdit = (e) => {
        const buttonContent = e.target.innerHTML;
        if (buttonContent === "Edit") {
           setIsEdit(true);
        } else if (buttonContent === "Cancel editing") {
           setIsEdit(false);
           const userId = localStorage.getItem('userId');
           getUser(userId);
        }
    }


    return (<div className='profile'>
              <h2 className='profile-title'>Your profile</h2>
              <form onChange={handleChange} onSubmit={handleSubmit}>
                <button className='edit-button' onClick={(e)=> {
                    e.stopPropagation();
                    handleEdit(e);
                }}>{isEdit? "Cancel editing" : "Edit"}</button>
                <p>First Name</p>
                <input disabled={!isEdit} value={form.firstname} placeholder='Your first name' maxLength={35} name='firstname'/>
                <p>Last Name</p>
                <input disabled={!isEdit} value={form.lastname} placeholder='Your last name' maxLength={35} name='lastname'/>
                <p>Phone Number</p>
                <input disabled={!isEdit} value={form.phonenumber} placeholder='Your phone number' type='tel' name='phonenumber'/>
                <p>City</p>
                <input disabled={!isEdit} value={form.city} placeholder='Your city' name='city'/>
                <p>Postal Code</p>
                <input disabled={!isEdit} value={form.postalcode} placeholder='Your postal code' name='postalcode'/>
                <p>Billing Address</p>
                <input disabled={!isEdit} value={form.billingaddress} placeholder='Your billing address' name='billingaddress'/>
                <p>Delivery Address</p>
                <input disabled={!isEdit} value={form.deliveryaddress} placeholder='Your delivery address' name='deliveryaddress'/>
              </form>
              <button onClick={() => props.logout()}>Log out</button>
              <NavLink to={'/deleteaccount'} className='delete-account-button'>Delete Account</NavLink>
           </div>
    )
}

export default Profile;