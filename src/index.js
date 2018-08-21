import React from 'react';
import ReactDOM from 'react-dom';
import { firebase } from './firebase/firebase';
import { history } from './routers/AppRouter';
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux';
import store from './store/store';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('root')
);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
  } else {
  }
})

registerServiceWorker();
//testtest - password
