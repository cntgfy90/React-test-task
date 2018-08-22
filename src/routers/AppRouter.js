import React from 'react';
import { firebase } from '../firebase/firebase';
import { connect } from 'react-redux';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { keepUserLoggedIn } from '../actions/auth';
import { fetchEvents } from '../actions/events';
import createHistory from 'history/createBrowserHistory';
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
        this.props.keepUserLoggedIn(user);
        this.props.fetchEvents();
      }
    });
  }

  render() {
    const { auth } = this.props;
    return (
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <PublicRoute path="/login" component={LoginPage} exact={true} auth={auth} />
            <PrivateRoute path="/calendar" component={CalendarPage} exact={true} auth={auth} />
            <PublicRoute component={NotFoundPage} auth={auth} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  keepUserLoggedIn: (user) => dispatch(keepUserLoggedIn(user)),
  fetchEvents: () => dispatch(fetchEvents())
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
