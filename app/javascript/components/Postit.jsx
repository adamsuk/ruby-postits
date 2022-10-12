import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import TextareaAutosize from 'react-textarea-autosize';
import { omit, isEqual } from 'lodash';

import useComponentVisible from './useComponentVisible';

import './Postit.css';

const Postit = ({
  postit,
  callback,
  className = '',
  newPostit = false,
  resetNewPostit = false,
  hide = true,
  omitKeys = ['id', 'created_at', 'updated_at']
}) => {
  const [currentPostit, setCurrentPostit] = useState(omit(postit, omitKeys));
  const [focusNewPostit, setFocusNewPostit] = useState(false);
  const { ref, isComponentVisible } = useComponentVisible(false);
  const [prevFocus, setPrevFocus] = useState(false);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios.post('/api/v1/postit', currentPostit)
  //     .then((res) => {
  //       console.log('Postit SENT')
  //       console.log(res)
  //     })
  //     if (callback) {
  //       callback();
  //     }
  // }

  useEffect(() => {
    if (newPostit && resetNewPostit) {
      setCurrentPostit(omit(postit, omitKeys));
    }
  }, [resetNewPostit]);

  // autosave
  useEffect(() => {
    setPrevFocus(isComponentVisible);
    console.log(currentPostit);
    console.log(postit);
    console.log(`equal: ${isEqual(currentPostit, omit(postit, omitKeys))}`);
    // check it was in focus and now isn't
    if (prevFocus && !isComponentVisible) {
      // has the postit changed?
      if (!isEqual(currentPostit, omit(postit, omitKeys))) {
        // new or edit?
        if (newPostit) {
          axios.post('/api/v1/postit', currentPostit).then((res) => {
            console.log('Postit SENT');
            console.log(res);
          });
        } else {
          axios.patch(`/api/v1/postit/${postit.id}`, currentPostit).then((res) => {
            console.log(`Postit ${postit.id} UPDATED`);
            console.log(res);
          });
        }
        if (callback) {
          callback();
        }
      }
    }
  }, [isComponentVisible]);

  // console.log(currentPostit)
  console.log(isComponentVisible);

  return (
    <div ref={ref}>
      <form
        className={classNames(className, 'postit', {
          'postit__new-postit': newPostit,
          'postit__new-postit-focus': focusNewPostit & !hide
        })}
        onClick={() => (newPostit ? setFocusNewPostit(true) : null)}
        // onSubmit={handleSubmit}
      >
        <TextareaAutosize
          className="postit-title"
          type="text"
          placeholder={!newPostit || focusNewPostit & !hide ? 'Some catchy title' : ''}
          maxLength="75"
          value={currentPostit.title}
          onChange={(e) => setCurrentPostit({ ...currentPostit, title: e.target.value })}
        />
        <TextareaAutosize
          className="postit-description"
          type="text"
          placeholder={!newPostit || focusNewPostit & !hide ? 'What you want to write ...' : ''}
          minRows={6}
          value={currentPostit.description}
          onChange={(e) => setCurrentPostit({ ...currentPostit, description: e.target.value })}
        />
        <input type="submit" hidden />
      </form>
    </div>
  );
};

export default Postit;
