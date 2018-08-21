import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
// Routes
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
// Pages components
import LoginPage from '../components/pages/LoginPage';
import CalendarPage from '../components/pages/CalendarPage';
import NotFoundPage from '../components/pages/NotFoundPage';

export const history = createHistory();

const AppRouter = (props) => (
  <Router history={history}>
    <Switch>
      <PublicRoute path="/login" component={LoginPage} exact={true} />
      <PrivateRoute path="/calendar" component={CalendarPage} exact={true} />
      <PublicRoute component={NotFoundPage} />
    </Switch>
  </Router>
);

export default AppRouter;
