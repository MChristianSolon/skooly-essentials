import React, { useState } from 'react';
import './TeacherMenu.css';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import LinkIcon from '@material-ui/icons/Link';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link, useParams } from 'react-router-dom';
import { db } from '../../Firebase/Firebase';

function TeacherMenu() {
  let { user } = useParams();
  const [youtubeLink, setYoutubeLink] = useState('');
  const [setRelevantLink] = useState('');

  function handleChangeLink(event) {
    event.preventDefault();
    setYoutubeLink(`${event.target.value.split('v=')[1]}`);
  }

  function handleChangeRL(event) {
    event.preventDefault();
    setRelevantLink('haha');
  }

  function handleCreate() {
    db.collection('videos').add({
      publisher: localStorage.getItem('currentUser'),
      videoUrl: youtubeLink,
      code: Math.floor(Math.random() * 100000),
    });
  }
  return (
    <>
      <div className="TeacherMenu">
        <form>
          <input
            className="teacher-input"
            type="text"
            name="YoutubeLink"
            placeholder="Enter Youtube URL"
            onChange={handleChangeLink}
          />
          <input
            className="teacher-input"
            type="text"
            name="RelevantLink"
            placeholder="Relevant link"
            onChange={handleChangeRL}
          />
          <br></br>
          <br></br>
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={handleCreate}
          >
            Create Page
          </Button>
        </form>
        <br></br>
        <br></br>

        <Link to={`/stage/${user}/${youtubeLink}`}>
          <Button variant="contained" startIcon={<ExitToAppIcon />}>
            Go To Page
          </Button>
        </Link>
        <Button variant="contained" startIcon={<LinkIcon />}>
          Copy Url
        </Button>
      </div>
    </>
  );
}

export default TeacherMenu;
