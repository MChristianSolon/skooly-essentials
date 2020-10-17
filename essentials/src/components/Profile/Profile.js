import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import SavedVideo from './SavedVideo'
import {db} from '../../Firebase/Firebase'
import {useParams} from 'react-router-dom'
import './Profile.css';
function Profile() {
  const [savedVideos, setSavedVideos] = useState([])
  const [profilePhoto, setProfilePhoto] = useState('')
  const {user, email} = useParams() 

  useEffect(() => {
    db.collection('users').doc(`${email}`).get().then(doc => {
      if(doc.data()){
        if(doc.data().saved) {
          setSavedVideos(doc.data().saved)     
      }if(doc.data().profilePicture){
        setProfilePhoto(doc.data().profilePicture)
      }
      }
    
    },[])
   
},[email])
  return (
    <Grid container className="profile-page">
      <Grid item md={4}>
        <img
          src={profilePhoto ? profilePhoto : "https://picsum.photos/200/300"}
          alt="ProfilePhoto"
          className="profile-photo"
        />
        <h3 className="profile-name">{user}</h3>
      </Grid>
      <Grid item md={8}>
      {/* <h1 className="profile-savedPages">Saved Pages</h1> */}
      </Grid>
      <Grid item md={12}>
      <div className="profile-videos">
      {savedVideos.map((video) => (<SavedVideo key={video.saved} data={video}/>))}
      </div>
      </Grid>
      
    </Grid>
  );
}

export default Profile;
