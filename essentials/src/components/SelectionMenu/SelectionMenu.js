import React, { useState, useEffect } from 'react';
import Gallery from './Gallery';
import LineGallery from './LineGallery';
import ComputerMan from '../../images/ComputerMan.png';
import './SelectionMenu.css';
import TextField from '@material-ui/core/TextField';
import Heart from '../../images/Heart.png';
import { db } from '../../Firebase/Firebase';
import { Redirect } from 'react-router-dom';

function SelectionMenu() {
  const [code, setCode] = useState('');
  const [target, setTarget] = useState(null);
  const [go, setGo] = useState(false);
  const [goCreate, setGoCreate] = useState(false);
  const [create, setCreate] = useState('');

  function handlChange(event) {
    setCode(event.target.value);
  }

  function createChange(event) {
    setCreate(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('FUCK');
    db.collection('videos')
      .get()
      .then((snap) => {
        snap.docs.forEach((doc) => {
          if (doc.data().code == code) {
            setTarget(doc.data());
          }
        });
      });
  }

  function createPage(event) {
    event.preventDefault();
    db.collection('videos').add({
      publisher: localStorage.getItem('currentUser'),
      videoUrl: `${create.split('v=')[1]}`,
      code: Math.floor(Math.random() * 10000),
    });
    setGoCreate(true);
  }

  useEffect(() => {
    if (target) setGo(true);
  }, [target]);

  return (
    <>
      {go ? (
        <Redirect to={`/stage/${target.publisher}/${target.videoUrl}`} />
      ) : goCreate ? (
        <Redirect
          to={`/stage/${localStorage.getItem('currentUser')}/${
            create.split('v=')[1]
          }`}
        />
      ) : (
        ''
      )}
      <div className="SelectionMenu">
        <div style={{ marginTop: '6vh', textAlign: 'center' }}>
          <div className="code-entry">
            <h1 className="to-do">Join A Room</h1>
            <h1 className="enter-code-here">Please Enter The Code</h1>
            <form onSubmit={handleSubmit}>
              <TextField
                id="filled-basic"
                label="CODE"
                variant="filled"
                style={{
                  position: 'absolute',
                  top: '40vh',
                  left: '15vw',
                  width: '35vw',
                }}
                value={code}
                onChange={handlChange}
              />
            </form>
            <div style={{ backgroundColor: 'white', width: '100%' }}>
              <img
                src={ComputerMan}
                alt="ComputerMan"
                style={{ width: '80vh', position: 'absolute', left: '45vw' }}
              />
            </div>
          </div>

          <div style={{ height: '500px', backgroundColor: '#F8E9A1' }}>
            <img
              src={Heart}
              alt="Heart"
              style={{
                width: '600px',
                position: 'relative',
                right: '55vw',
                bottom: '4vh',
              }}
            />
            <h1 className="to-do">Create A Page</h1>
            <h1 style={{ position: 'relative', left: '38vw', top: '10vh' }}>
              Enter a Url
            </h1>
            <form onSubmit={createPage}>
              <TextField
                id="filled-basic"
                label="Enter Youtube Video Link Here"
                variant="filled"
                style={{
                  poistion: 'relative',
                  bottom: '40vh',
                  width: '35vw',
                  left: '20vw',
                }}
                onChange={createChange}
              />
            </form>
          </div>

          <LineGallery />
        </div>
      </div>
    </>
  );
}

export default SelectionMenu;
