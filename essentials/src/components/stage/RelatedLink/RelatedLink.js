import React, { useEffect, useState } from 'react';
import { db } from '../../../Firebase/Firebase';
import "./RelatedLink.css"

function RelatedLink({ pageId }) {
  const [currentRelatedLink, setCurrentRelatedLink] = useState(null);
  useEffect(() => {
    setCurrentRelatedLink(null);
    db.collection('videos').onSnapshot((snap) => {
      snap.docs.forEach((doc) => {
        if (doc.id === pageId) {
          setCurrentRelatedLink(doc.data().relatedLink);
        }
      });
    });
  }, [pageId]);

  return (
    <div>
      {currentRelatedLink ? (
        <embed
          key={currentRelatedLink}
          id="stageFrame"
          src={currentRelatedLink}
          style={{ width: '100%', height: '100vh' }}
        />
      ) : (
        <div className="relatedLink__link">
        <h1 className="relatedLink__text">Files</h1>
        </div>
      )}
    </div>
  );
}

export default RelatedLink;
