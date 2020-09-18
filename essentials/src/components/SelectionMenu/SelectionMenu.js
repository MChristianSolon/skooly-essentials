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
  const [validCreate, setValidCreate] = useState(false);
  const [validTarget, setValidTarget] = useState(false);
  function handlChange(event) {
    setCode(event.target.value);
  }

  function createChange(event) {
    setCreate(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    db.collection('videos')
      .get()
      .then((snap) => {
        snap.docs.forEach((doc) => {
          if (doc.data().code == code) {
            setTarget(doc.data());
          }
        });
      })
      .then(() => {
        if (target) {
        } else {
          setValidTarget(true);
        }
      });
  }

  function createPage(event) {
    event.preventDefault();
    console.log(create.split('v=')[1]);
    if (create.split('v=')[1]) {
      db.collection('videos').add({
        publisher: localStorage.getItem('currentUser'),
        videoUrl: `${create.split('v=')[1].split('&')[0]}`,
        code: Math.floor(Math.random() * 10000),
      });
      setGoCreate(true);
    } else {
      setValidCreate(true);
    }
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
            create.split('v=')[1].split('&')[0]
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
                error={validTarget}
                helperText={validTarget ? 'No Such Code Exists.' : ''}
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
                autoComplete="off"
              />
            </form>
            <div style={{ backgroundColor: 'white', width: '100%' }}>
              <img
                src={ComputerMan}
                alt="ComputerMan"
                style={{ width: '80vh', position: 'relative', left: '3vw' }}
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
                error={validCreate}
                helperText={validCreate ? 'Invalid Url' : ''}
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
                autoComplete="off"
              />
            </form>
          </div>
          <LineGallery />
          <LineGallery />
        </div>
      </div>
    </>
  );
}

export default SelectionMenu;
