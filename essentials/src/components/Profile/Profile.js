import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import SavedVideo from './SavedVideo'
import {db, auth} from '../../Firebase/Firebase'
import './Profile.css';
function Profile() {
  const [savedVideos, setSavedVideos] = useState([])

  useEffect(() => {
    db.collection('users').doc(`${auth.currentUser.email}`).get().then(doc => {
        if(doc.data().saved) {
            console.log(doc.data().saved)
            setSavedVideos(doc.data().saved)
        }
    })
   
},[])
  return (
    <Grid container className="profile-page">
      <Grid item md={4}>
        <img
          src={localStorage.getItem('photoUrl')}
          alt="ProfilePhoto"
          className="profile-photo"
        />
        <h3 className="profile-name">{localStorage.getItem('currentUser')}</h3>
      </Grid>
      <Grid item md={8}>
      <h1 className="profile-savedPages">Saved Pages</h1>
      {savedVideos.map((video) => (<SavedVideo data={video}/>))}
      </Grid>
    </Grid>
  );
}

export default Profile;
