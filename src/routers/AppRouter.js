import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
// Routes
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
// Pages components
import LoginPage from '../components/pages/LoginPage';
import CalendarPage from '../components/pages/CalendarPage';

export const history = createHistory();

const AppRouter = (props) => (
  <Router history={history}>
    <Switch>
      <PublicRoute path="/login" component={LoginPage} exact={true} />
      <PrivateRoute path="/calendar" component={CalendarPage} exact={true} />
    </Switch>
  </Router>
);

export default AppRouter;
