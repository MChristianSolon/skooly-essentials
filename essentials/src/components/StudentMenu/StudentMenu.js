import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import './StudentMenu.css';
function StudentMenu() {
  const [url, setURL] = useState('');

  function handleChange(event) {
    setURL(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }
  return (
    <div className="studentMenu">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="studentURL"
          placeholder="Enter Url"
          value={url}
          onChange={handleChange}
        />
        <br></br>
        <br></br>
        <Button variant="contained" color="default">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default StudentMenu;
