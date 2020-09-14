import React from 'react';

function Profile() {
  return (
    <div>
      <h1>{localStorage.getItem('currentUser')}</h1>
    </div>
  );
}

export default Profile;
