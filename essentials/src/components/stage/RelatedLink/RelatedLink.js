import React, { useEffect, useState } from 'react';
import { db } from '../../../Firebase/Firebase';

function RelatedLink({ pageId }) {
  const [currentRelatedLink, setCurrentRelatedLink] = useState('');
  useEffect(() => {
    if (pageId.length >= 1) {
      db.collection('videos')
        .doc(pageId)
        .onSnapshot((doc) => setCurrentRelatedLink(doc.data().relatedLink));
    }
  }, [pageId]);

  return (
    <div>
      <embed
        src={`https://www.bing.com/?toWww=1&redig=D6AAEB2C5FE04D7E93346F9EC423ABA6`}
        style={{ width: '100%', height: '100vh' }}
      />
    </div>
  );
}

export default RelatedLink;
