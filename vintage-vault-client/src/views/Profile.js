import React, { useState, useEffect } from 'react';
import { URL } from '../config.js';
import axios from 'axios';

const Profile = (props) => {
   const userId = props.userId
   const [form, setForm] = useState({
    firstname:"",
    lastname:"",
    phonenumber:0,
    address:"",
    _id: "",
   })

   const [isEdit,setIsEdit] = useState(false);

   useEffect(()=>{
    if (userId) {
        getUser(userId);
     } else {
        alert("User ID not found");
     }
   }, [userId]);

   useEffect(()=>{
    console.log(form)
   },[form])

   const getUser = async (userId) => {
    try{
        const response = await axios.get(`${URL}/users/get/${userId}`);
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
           const response = await axios.post(`${URL}/users/update/${userId}`, {
            updateData: {
              firstname: form.firstname,
              lastname: form.lastname,
              phonenumber: form.phonenumber,
              address: form.address,
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
                <p>Address</p>
                <input disabled={!isEdit} value={form.address} placeholder='Your address' name='address'/>
              </form>
              <button onClick={() => props.logout()}>Log out</button>
              <button className='delete-account-button'>Delete Account</button>
           </div>
    )
}

export default Profile;