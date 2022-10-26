import '@hotwired/turbo-rails';
import './controllers';
// import * as bootstrap from "bootstrap"

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';

const root = createRoot(document.getElementById('root'));
root.render(
  <div className="mainContainer">
    <App />
  </div>
);
