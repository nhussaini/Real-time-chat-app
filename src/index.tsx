// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.css';

export const ReactStrictMode = <React.StrictMode>
  <App />
</React.StrictMode>

export const rootElement = document.getElementById('root')

ReactDOM.render(
  ReactStrictMode,
  rootElement
);