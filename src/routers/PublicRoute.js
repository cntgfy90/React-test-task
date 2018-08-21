import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

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

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PublicRoute);
