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
        <div style={{ marginTop: '6vh' }}>
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
                  position: 'relative',
                  top: '35vh',
                  right: '28vw',
                  width: '35vw',
                  marginLeft: '15vw',
                }}
                value={code}
                onChange={handlChange}
                autoComplete="off"
              />
            </form>
            <img
              src={ComputerMan}
              alt="ComputerMan"
              style={{
                width: '80vh',
                position: 'absolute',
                left: '45vw',
                bottom: '130px',
              }}
            />
          </div>

          <div
            style={{
              height: '65vh',
              backgroundColor: '#F8E9A1',
              minWidth: '100vw',
            }}
          >
            <img
              src={Heart}
              alt="Heart"
              style={{
                width: '35vw',
                position: 'absolute',
                left: '0px',
              }}
            />
            <h1 style={{ margin: 'auto', position: 'relative', left: '35vw' }}>
              Create A Page
            </h1>

            <form onSubmit={createPage}>
              <h1 style={{ position: 'relative', left: '25vw', top: '15vh' }}>
                {' '}
                Enter Url
              </h1>
              <TextField
                error={validCreate}
                helperText={validCreate ? 'Invalid Url' : ''}
                id="filled-basic"
                label="Enter Youtube Video Link Here"
                variant="filled"
                onChange={createChange}
                autoComplete="off"
                style={{
                  position: 'relative',
                  top: '35vh',
                  width: '35vw',
                  right: '3vw',
                }}
              />
            </form>
          </div>
        </div>
      </div>
      <LineGallery />
      <LineGallery />
    </>
  );
}

export default SelectionMenu;
