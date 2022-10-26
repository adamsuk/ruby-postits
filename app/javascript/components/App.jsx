import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Homepage from './Homepage';
import PostitContainer from './PostitContainer';

import './App.css';

const App = () => (
  <Router>
    <Routes>
      <Route path="/:workspaceId" element={<PostitContainer />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  </Router>
);

export default App;
