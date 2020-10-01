import React, { useState, useEffect, useContext } from 'react';
import Gallery from './Gallery';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import ComputerMan from '../../images/ComputerMan.png';
import './SelectionMenu.css';
import TextField from '@material-ui/core/TextField';
import Heart from '../../images/Heart.png';
import { db, timestamp } from '../../Firebase/Firebase';
import { Redirect } from 'react-router-dom';
import { SearchContext } from '../Contexts/SearchContext';
import Grid from '@material-ui/core/Grid';
import Segregation from './Segregation';

function SelectionMenu() {
  const [code, setCode] = useState('');
  const [target, setTarget] = useState(null);
  const [go, setGo] = useState(false);
  const [goCreate, setGoCreate] = useState(false);
  const [create, setCreate] = useState('');
  const [validCreate, setValidCreate] = useState(false);
  const [validTarget, setValidTarget] = useState(false);
  const { search } = useContext(SearchContext);
  const [searchVideos, setSearchVideos] = useState([]);
  const [displaySearch, setDisplaySearch] = useState([]);

  //Search All Arrays
  useEffect(() => {
    db.collection('videos').onSnapshot((snap) => {
      setSearchVideos(() => {
        let newArr = snap.docs.map((doc) => {
          return (
            <Gallery
              key={Math.random()}
              publisher={doc.data().publisher}
              url={doc.data().videoUrl}
              title={doc.data().title}
            />
          );
        });
        return newArr;
      });
    });
  }, []);

  //Filter Arrays
  useEffect(() => {
    if (/.+/gi.test(search)) {
      var regexp = new RegExp(search + '+', 'gi');
      setDisplaySearch(() => {
        return searchVideos.map((item) => {
          //searching publisher for now
          if (regexp.test(item.props.title)) {
            return item;
          }
          return null;
        });
      });
    } else {
      setDisplaySearch([]);
    }
  }, [search, searchVideos]);

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
          if (doc.data().code === parseInt(code)) {
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

  //Page Creation
  function createPage(event) {
    event.preventDefault();
    console.log(create.split('v=')[1]);
    if (create.split('v=')[1]) {
      db.collection('videos').add({
        publisher: localStorage.getItem('currentUser'),
        videoUrl: `${create.split('v=')[1].split('&')[0]}`,
        code: Math.floor(Math.random() * 10000),
        time: timestamp(),
      });
      setGoCreate(true);
    } else {
      setValidCreate(true);
    }
  }

  //Stage Redirect
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
      <Grid
        container
        className="searchGallery"
        style={displaySearch.length > 0 ? { marginTop: '100px' } : {}}
        spacing={2}
      >
        {displaySearch}
      </Grid>
      <div
        className="SelectionMenu"
        style={displaySearch.length > 0 ? { display: 'none' } : {}}
      >
        <div className="code-entry">
          <h1 className="to-do">Join A Room</h1>
          <h1 className="enter-code-here">Just Enter A Code</h1>

          <img src={ComputerMan} alt="ComputerMan" className="computer-man" />

          <form onSubmit={handleSubmit} className="code-form">
            <TextField
              className="code-text-field"
              error={validTarget}
              helperText={validTarget ? 'No Such Code Exists.' : ''}
              label={
                <h1 style={{ margin: '0px', backgroundColor: 'transparent' }}>
                  Enter the Code
                </h1>
              }
              variant="outlined"
              value={code}
              onChange={handlChange}
              autoComplete="off"
            />
          </form>
        </div>
        <hr></hr>
        <div className="create-page">
          <img
            src={Heart}
            alt="Heart"
            style={{
              position: 'absolute',
              width: '35vw',
            }}
          />

          <form onSubmit={createPage} className="create-page-form">
            <h1 className="create-page-icon enter-code-here">
              <NoteAddIcon
                style={{
                  position: 'relative',
                  top: '20px',
                  width: '80px',
                  height: '80px',
                  color: 'white',
                  marginRight: '20px',
                }}
              />
              Create A Page
            </h1>

            <h1 className="create-url"> Enter Url</h1>
            <TextField
              error={validCreate}
              helperText={validCreate ? 'Invalid Url' : ''}
              className="code-text-field url-text-field"
              label="Enter Youtube Video Link Here"
              variant="filled"
              onChange={createChange}
              autoComplete="off"
            />
          </form>
        </div>
      </div>

      <Segregation />
    </>
  );
}

export default SelectionMenu;
