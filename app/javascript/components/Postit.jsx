import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import TextareaAutosize from 'react-textarea-autosize';
import { omit, isEqual } from 'lodash';
import { IoMdCloseCircleOutline } from 'react-icons/io';

import useComponentVisible from './useComponentVisible';

import './Postit.css';

const Postit = ({
  postit,
  callback,
  className = '',
  newPostit = false,
  resetNewPostit = false,
  hide = true,
  omitKeys = ['id', 'created_at', 'updated_at'],
  workspaceId
}) => {
  const [currentPostit, setCurrentPostit] = useState(omit(postit, omitKeys));
  const [focusNewPostit, setFocusNewPostit] = useState(false);
  const { ref, isComponentVisible } = useComponentVisible(false);
  const [prevFocus, setPrevFocus] = useState(false);

  useEffect(() => {
    if (newPostit && resetNewPostit) {
      setCurrentPostit(omit(postit, omitKeys));
    }
  }, [resetNewPostit]);

  // autosave
  useEffect(() => {
    setPrevFocus(isComponentVisible);
    // check it was in focus and now isn't
    if (prevFocus && !isComponentVisible) {
      // has the postit changed?
      if (!isEqual(currentPostit, omit(postit, omitKeys))) {

        console.log(currentPostit)
        // new or edit?
        if (newPostit) {
          axios.post('/api/v1/postit', {
            ...currentPostit,
            workspace_id: workspaceId
          }).then((res) => {
            console.log('Postit SENT');
            console.log(res);
          });
        } else {
          axios.patch(`/api/v1/postit/${postit.id}`, {
            ...currentPostit,
            workspace_id: workspaceId
          }).then((res) => {
            console.log(`Postit ${postit.id} UPDATED`);
            console.log(res);
          });
        }
        if (newPostit && callback) {
          callback();
        }
      }
    }
  }, [isComponentVisible]);

  const deletePostit = () => {
    axios.delete(`/api/v1/postit/${postit.id}`).then((res) => {
      console.log('Postit DELETED');
      console.log(res);
    });
    if (callback) {
      callback();
    }
  }

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
        {!newPostit && <IoMdCloseCircleOutline onClick={deletePostit} className="postit-close" />}
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
