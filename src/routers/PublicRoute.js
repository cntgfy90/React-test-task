import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import _ from 'lodash';

export const PublicRoute = ({
  auth,
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={(props) => (
      !_.isEmpty(auth.user) ? (
          <Redirect to="/calendar" />
      ) : (
          <Component {...props} />
        )
    )} />
  );

export default PublicRoute;
