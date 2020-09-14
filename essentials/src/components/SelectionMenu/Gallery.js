import React from 'react';
import LecturesLogo from '../../images/Lectures.png';

function Gallery() {
  //   useEffect(() => {
  //     db.collection('videos').onSnapshot((snap) => {
  //       snap.docs.forEach((doc) => {
  //         console.log(doc.data());
  //       });
  //     });
  //   }, []);
  return (
    <div style={{ height: '16vh', marginBottom: '5vh' }}>
      <img
        src={LecturesLogo}
        alt="LecturesLogo"
        style={{ position: 'relative', bottom: '15vh' }}
      />
    </div>
  );
}

export default Gallery;
