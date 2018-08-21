import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import registerServiceWorker from './registerServiceWorker';
// import bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <AppRouter />,
  document.getElementById('root')
);

registerServiceWorker();
