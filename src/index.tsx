import * as React from 'react';
import * as ReactDOM from 'react-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

function AppFrame() {
  return (
    <React.Fragment>
      <CssBaseline />
      <App />
    </React.Fragment>
  );
}

ReactDOM.render(
  <AppFrame />,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();