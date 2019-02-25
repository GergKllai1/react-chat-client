import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ActionCableProvider } from 'react-actioncable-provider';
import { API_WS_ROOT } from './constants';


ReactDOM.render(
  <div>
    <ActionCableProvider url={API_WS_ROOT}>
      <App />
    </ActionCableProvider>
  </div>,
  document.getElementById('root'));

serviceWorker.unregister();
