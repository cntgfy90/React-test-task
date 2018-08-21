import React from 'react';
import ReactDOM from 'react-dom';
import { firebase } from './firebase/firebase';
import { login, logout } from './actions/auth';
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux';
import store from './store/store';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'));
    hasRendered = true;
  }
};

// ReactDOM.render(<LoadingPage />, document.getElementById('root'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    // store.dispatch(startSetExpenses()).then(() => {
    //   renderApp();
    //   if (history.location.pathname === '/') {
    //     history.push('/calendar');
    //   }
    // });
    renderApp();
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});

registerServiceWorker();
//testtest - password
