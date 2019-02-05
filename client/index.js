import React from 'react';
import ReactDOM from 'react-dom';
import Root from './store';
import App from './App';
import socket from './socket';
import './sass/index.scss';

ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.getElementById('root')
);
