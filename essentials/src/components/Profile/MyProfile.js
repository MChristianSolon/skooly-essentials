import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';


function MyProfile({profilePhoto, user}) {
    return (
       <Card className="myProfile__card">
           <CardActionArea>
               <CardContent>
           <img
          src={profilePhoto ? profilePhoto : "https://picsum.photos/200/300"}
          alt="ProfilePhoto"
          className="profile-photo"
        />
        <h3 className="profile-name">{user}</h3>
               </CardContent>
           </CardActionArea>
       </Card>
    )
}

export default MyProfile
