import React, { useEffect } from 'react';
import { db } from '../../Firebase/Firebase';

function Gallery() {
  //   useEffect(() => {
  //     db.collection('videos').onSnapshot((snap) => {
  //       snap.docs.forEach((doc) => {
  //         console.log(doc.data());
  //       });
  //     });
  //   }, []);
  return <div>Gallery</div>;
}

export default Gallery;
