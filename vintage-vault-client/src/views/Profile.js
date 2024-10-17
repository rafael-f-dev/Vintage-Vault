import React from 'react';

const Profile = (props) => {
    return (<div className='profile'>
              <p>I am profile</p>
              <button onClick={() => props.logout()}>Log out</button>
           </div>
    )
}

export default Profile;