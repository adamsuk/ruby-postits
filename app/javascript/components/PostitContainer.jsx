import React, { useEffect, useState } from 'react';
import axios from 'axios';

import useComponentVisible from './useComponentVisible';
import PostIt from './Postit';
import PostIts from './Postits';

const PostitContainer = () => {
  const [loadPostits, setLoadPostits] = useState(true);
  const [postits, setPostits] = useState([]);
  const [resetNew, setResetNew] = useState(false);
  const { ref, isComponentVisible } = useComponentVisible(true);

  const initPostit = {
    title: '',
    description: '',
    done: false
  };

  useEffect(() => {
    if (loadPostits) {
      axios.get('/api/v1/postit').then((res) => {
        setPostits(res.data);
      });
      setLoadPostits(false);
      setResetNew(true);
    } else {
      setResetNew(false);
    }
  }, [loadPostits]);

  return (
    <>
      <div ref={ref}>
        <PostIt
          callback={() => setLoadPostits(true)}
          postit={initPostit}
          newPostit={true}
          hide={!isComponentVisible}
          resetNewPostit={resetNew}
        />
      </div>
      <PostIts postits={postits} />
    </>
  );
};

export default PostitContainer;
