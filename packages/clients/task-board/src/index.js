import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { dialog } from '@microsoft/teams-js';

import App from './App';
import * as serviceWorker from './serviceWorker';

document.onkeyup = function (event) {
  //according to guidelines
  if (event.key === 27 || event.key === 'Escape') {
    dialog.submit(null); // this will return an err object to the completionHandler()
  }
};

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
