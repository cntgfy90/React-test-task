import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
// Pages components
import LoginPage from '../components/pages/LoginPage';
import CalendarPage from '../components/pages/CalendarPage';

export const history = createHistory();

const AppRouter = (props) => (
  <Router history={history}>
    <Switch>
      <Route path="/login" component={LoginPage} exact={true} />
      <Route path="/calendar" component={CalendarPage} exact={true} />
    </Switch>
  </Router>
);

export default AppRouter;
