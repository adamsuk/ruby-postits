import React from 'react';

import PostitContainer from './PostitContainer';

import './App.css';

export default App = () => {
  return (
    <div className="mainContainer">
      <div className="topHeading">
        <h1>Simple Post-its</h1>
      </div>
      <PostitContainer />
    </div>
  );
};
