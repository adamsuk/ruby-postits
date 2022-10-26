import React from 'react';
import withRouter from '../hooks/withRouter';
import axios from 'axios';

import './Homepage.css'

const Homepage = ({ router: { navigate }}) => {
  const initPostit = {
    title: 'Welcome to Simple Post-its',
    description: 'Just Click Me to Start a Workspace!'
  }

  const createWorkspace = () => {
    axios.post('/api/v1/workspace').then((res) => {
      console.log(res)
      if (res.status === 200 && res.data?.id) {
        navigate(`/${res.data.id}`)
      }
    });
  }

  return (
    <div className='homepage__container'>
      <div className='homepage__postit' onClick={createWorkspace}>
        <p className="homepage__postit-title">
          {initPostit.title}
        </p>
        <hr></hr>
        <p className="homepage__postit-description">
          {initPostit.description}
        </p>
      </div>
    </div>
  )
}

export default withRouter(Homepage);
