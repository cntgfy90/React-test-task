import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Pages components
import LoginPage from '../components/pages/LoginPage';
import CalendarPage from '../components/pages/CalendarPage';

const AppRouter = (props) => (
  <Router>
    <Switch>
      <Route path="/login" component={LoginPage} exact={true} />
      <Route path="/calendar" component={CalendarPage} exact={true} />
    </Switch>
  </Router>
);

export default AppRouter;
