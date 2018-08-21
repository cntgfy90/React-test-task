import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import _ from 'lodash';

export const PrivateRoute = ({
  auth,
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={(props) => (
      !_.isEmpty(auth.user) ? (
          <Component {...props} />
      ) : (
          <Redirect to="/login" />
        )
    )} />
  );

export default PrivateRoute;
