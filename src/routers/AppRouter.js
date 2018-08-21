import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { firebase } from '../firebase/firebase';
import { keepUserLoggedIn } from '../actions/auth';
import { connect } from 'react-redux';
// Routes
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
// Pages components
import LoginPage from '../components/pages/LoginPage';
import CalendarPage from '../components/pages/CalendarPage';
import NotFoundPage from '../components/pages/NotFoundPage';
// Common components
import Header from '../components/smart/Header';

export const history = createHistory();

class AppRouter extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        this.props.keepUserLoggedIn(user)
      } else {

      }
    })
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <PublicRoute path="/login" component={LoginPage} exact={true} />
            <PrivateRoute path="/calendar" component={CalendarPage} exact={true} />
            <PublicRoute component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  keepUserLoggedIn: (user) => dispatch(keepUserLoggedIn(user))
});

export default connect(null, mapDispatchToProps)(AppRouter);
