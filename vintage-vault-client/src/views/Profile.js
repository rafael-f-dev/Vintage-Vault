import React from 'react';

const Profile = (props) => {
    return (<div className='profile'>
              <h2 className='profile-title'>Your profile</h2>
              <form>
                <p>First Name</p>
                <input placeholder='Your first name' name='firstname'/>
                <p>Last Name</p>
                <input placeholder='Your last name' name='lastname'/>
                <p>Phone Number</p>
                <input placeholder='Your phone number' name='phonenumber'/>
                <p>Address</p>
                <input placeholder='Your address' name='address'/>
              </form>
              <button onClick={() => props.logout()}>Log out</button>
           </div>
    )
}

export default Profile;