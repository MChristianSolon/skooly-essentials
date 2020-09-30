import React from 'react';
import Grid from '@material-ui/core/Grid';
import './Profile.css';
function Profile() {
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
        {/* <div className="profile-questions">
          <h2>BookMarked Pages</h2>
          <ul>
            <li>code:</li>
            <li>code:</li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div> */}
      </Grid>
    </Grid>
  );
}

export default Profile;
