import React, { useEffect, useState } from 'react';
import withRouter from '../hooks/withRouter';
import axios from 'axios';

import useComponentVisible from './useComponentVisible';
import PostIt from './Postit';
import PostIts from './Postits';

import './PostitContainer.css'

const PostitContainer = ({ router: { params, navigate } }) => {
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
      axios.get(`/api/v1/workspace/${params.workspaceId}`).then((res) => {
        if (res.status === 204) {
          navigate('/')
        }
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
      <div className="postit-container__header">
        <h1>Simple Post-its</h1>
      </div>
      <div ref={ref}>
        <PostIt
          callback={() => setLoadPostits(true)}
          postit={initPostit}
          newPostit={true}
          hide={!isComponentVisible}
          resetNewPostit={resetNew}
          {...params}
        />
      </div>
      <PostIts postits={postits} {...params} callback={() => setLoadPostits(true)} />
    </>
  );
};

export default withRouter(PostitContainer);
